import { ActivatedRoute } from '@angular/router';

/**
 * Truy cập route con sâu nhất (dùng cho ultilities, có thể dùng nhiều nơi)
 * @param route ActivatedRoute hiện tại
 * @returns ActivatedRoute sâu nhất
 */
export function getCurrentRoute(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
        route = route.firstChild;
    }
    return route;
}