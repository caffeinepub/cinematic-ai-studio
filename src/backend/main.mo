import Array "mo:core/Array";
import Time "mo:core/Time";
import List "mo:core/List";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import MixinStorage "blob-storage/Mixin";
import Iter "mo:core/Iter";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Persistent state for people
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  type VideoProject = {
    id : Text;
    title : Text;
    concept : Text;
    length : Nat; // Desired length in seconds
    stylePreferences : Text;
    targetAudience : Text;
    status : Text; // draft, generating, completed
    thumbnail : ?Text; // URL to thumbnail image
    createdAt : Int;
  };

  let videoProjects = Map.empty<Text, VideoProject>();

  public shared ({ caller }) func createVideoProject(
    title : Text,
    concept : Text,
    length : Nat,
    stylePreferences : Text,
    targetAudience : Text,
  ) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create video projects");
    };
    let id = "project_" # Time.now().toText();
    let project : VideoProject = {
      id;
      title;
      concept;
      length;
      stylePreferences;
      targetAudience;
      status = "draft";
      thumbnail = null;
      createdAt = Time.now();
    };
    videoProjects.add(id, project);
    id;
  };

  public shared ({ caller }) func updateProjectStatus(projectId : Text, status : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update project status");
    };
    switch (videoProjects.get(projectId)) {
      case (null) { Runtime.trap("Project not found") };
      case (?project) {
        let updatedProject = { project with status };
        videoProjects.add(projectId, updatedProject);
      };
    };
  };

  public query ({ caller }) func getProject(projectId : Text) : async VideoProject {
    switch (videoProjects.get(projectId)) {
      case (null) { Runtime.trap("Project does not exist") };
      case (?project) { project };
    };
  };

  public query ({ caller }) func getAllProjects() : async [VideoProject] {
    videoProjects.values().toArray();
  };
};
