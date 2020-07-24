import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { PermissionsGuard } from './guard/permissions.guard';

export function Permissions(...permissions: string[]) {
  return applyDecorators(
    SetMetadata('permissions', permissions),
    UseGuards(JwtAuthGuard, PermissionsGuard),
  );
}