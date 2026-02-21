import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface VideoProject {
    id: string;
    status: string;
    concept: string;
    title: string;
    thumbnail?: string;
    createdAt: bigint;
    targetAudience: string;
    length: bigint;
    stylePreferences: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createVideoProject(title: string, concept: string, length: bigint, stylePreferences: string, targetAudience: string): Promise<string>;
    getAllProjects(): Promise<Array<VideoProject>>;
    getCallerUserRole(): Promise<UserRole>;
    getProject(projectId: string): Promise<VideoProject>;
    isCallerAdmin(): Promise<boolean>;
    updateProjectStatus(projectId: string, status: string): Promise<void>;
}
