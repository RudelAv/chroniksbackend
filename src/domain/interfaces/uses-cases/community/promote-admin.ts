export interface PromoteAdminUseCase {
    promoteAdmin(communityId: string, userId: string, adminId: string): any;
}