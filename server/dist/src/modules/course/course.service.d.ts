import { PaginationParams, FilterParams, PaginatedResponse } from '../../types';
/**
 * Course Service
 * Handles all business logic for courses
 */
export declare class CourseService {
    /**
     * Get all courses with pagination and filters
     */
    getAllCourses(pagination: PaginationParams, filters: FilterParams): Promise<PaginatedResponse<any>>;
    /**
     * Get single course by ID
     */
    getCourseById(id: string): Promise<any>;
    /**
     * Get course by product ID
     */
    getCourseByProductId(productId: string): Promise<any>;
    /**
     * Create new course
     */
    createCourse(data: {
        productId: string;
        title: string;
        description?: string | null | undefined;
        instructor?: string | null | undefined;
        duration?: string | null | undefined;
        level?: string | null | undefined;
        language?: string | undefined;
        thumbnail?: string | null | undefined;
        videoUrl?: string | null | undefined;
        resources?: string[] | undefined;
        modules?: string | null | undefined;
        status?: string | undefined;
    }): Promise<any>;
    /**
     * Update course
     */
    updateCourse(id: string, data: {
        title?: string | undefined;
        description?: string | null | undefined;
        instructor?: string | null | undefined;
        duration?: string | null | undefined;
        level?: string | null | undefined;
        language?: string | undefined;
        thumbnail?: string | null | undefined;
        videoUrl?: string | null | undefined;
        resources?: string[] | undefined;
        modules?: string | null | undefined;
        status?: string | undefined;
    }): Promise<any>;
    /**
     * Delete course
     */
    deleteCourse(id: string): Promise<void>;
}
export declare const courseService: CourseService;
//# sourceMappingURL=course.service.d.ts.map