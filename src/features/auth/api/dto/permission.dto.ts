interface CrudResponseDto {
    create?: boolean;
    read?: boolean;
    update?: boolean;
    delete?: boolean;
}

export interface PermissionResponseDto {
    posts: CrudResponseDto,
    comments: CrudResponseDto,
    profile: CrudResponseDto,
    portfolio: CrudResponseDto,
}