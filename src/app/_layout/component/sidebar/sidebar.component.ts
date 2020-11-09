import { Component, OnInit } from '@angular/core';
import { PermissionType } from 'src/app/_model/permission';
import { PermissionService } from 'src/app/_service/permission.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'ares-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  hotelName: string = environment.app.hotelName;

  constructor(private permissionService: PermissionService) {}

  /**
   * Initialize component
   */
  ngOnInit(): void {}

  /**
   * Check if user has permission
   *
   * @return boolean
   */
  hasPermission(key: string | PermissionType): boolean {
    return this.permissionService.has(key);
  }

  /**
   * Check if user has any permissions
   *
   * @return boolean
   */
  hasPermissions(): boolean {
    return (
      this.permissionService.permissions &&
      this.permissionService.permissions.length > 0
    );
  }
}
