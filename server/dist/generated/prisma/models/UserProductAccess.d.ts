import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model UserProductAccess
 *
 */
export type UserProductAccessModel = runtime.Types.Result.DefaultSelection<Prisma.$UserProductAccessPayload>;
export type AggregateUserProductAccess = {
    _count: UserProductAccessCountAggregateOutputType | null;
    _avg: UserProductAccessAvgAggregateOutputType | null;
    _sum: UserProductAccessSumAggregateOutputType | null;
    _min: UserProductAccessMinAggregateOutputType | null;
    _max: UserProductAccessMaxAggregateOutputType | null;
};
export type UserProductAccessAvgAggregateOutputType = {
    courseProgress: number | null;
};
export type UserProductAccessSumAggregateOutputType = {
    courseProgress: number | null;
};
export type UserProductAccessMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    orderId: string | null;
    orderItemId: string | null;
    productId: string | null;
    productType: string | null;
    email: string | null;
    password: string | null;
    licenseKey: string | null;
    accessUrl: string | null;
    downloadUrl: string | null;
    courseProgress: number | null;
    courseStatus: string | null;
    subscriptionStatus: string | null;
    expiresAt: Date | null;
    metadata: string | null;
    notes: string | null;
    status: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type UserProductAccessMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    orderId: string | null;
    orderItemId: string | null;
    productId: string | null;
    productType: string | null;
    email: string | null;
    password: string | null;
    licenseKey: string | null;
    accessUrl: string | null;
    downloadUrl: string | null;
    courseProgress: number | null;
    courseStatus: string | null;
    subscriptionStatus: string | null;
    expiresAt: Date | null;
    metadata: string | null;
    notes: string | null;
    status: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type UserProductAccessCountAggregateOutputType = {
    id: number;
    userId: number;
    orderId: number;
    orderItemId: number;
    productId: number;
    productType: number;
    email: number;
    password: number;
    licenseKey: number;
    accessUrl: number;
    downloadUrl: number;
    courseProgress: number;
    courseStatus: number;
    subscriptionStatus: number;
    expiresAt: number;
    metadata: number;
    notes: number;
    status: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type UserProductAccessAvgAggregateInputType = {
    courseProgress?: true;
};
export type UserProductAccessSumAggregateInputType = {
    courseProgress?: true;
};
export type UserProductAccessMinAggregateInputType = {
    id?: true;
    userId?: true;
    orderId?: true;
    orderItemId?: true;
    productId?: true;
    productType?: true;
    email?: true;
    password?: true;
    licenseKey?: true;
    accessUrl?: true;
    downloadUrl?: true;
    courseProgress?: true;
    courseStatus?: true;
    subscriptionStatus?: true;
    expiresAt?: true;
    metadata?: true;
    notes?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type UserProductAccessMaxAggregateInputType = {
    id?: true;
    userId?: true;
    orderId?: true;
    orderItemId?: true;
    productId?: true;
    productType?: true;
    email?: true;
    password?: true;
    licenseKey?: true;
    accessUrl?: true;
    downloadUrl?: true;
    courseProgress?: true;
    courseStatus?: true;
    subscriptionStatus?: true;
    expiresAt?: true;
    metadata?: true;
    notes?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type UserProductAccessCountAggregateInputType = {
    id?: true;
    userId?: true;
    orderId?: true;
    orderItemId?: true;
    productId?: true;
    productType?: true;
    email?: true;
    password?: true;
    licenseKey?: true;
    accessUrl?: true;
    downloadUrl?: true;
    courseProgress?: true;
    courseStatus?: true;
    subscriptionStatus?: true;
    expiresAt?: true;
    metadata?: true;
    notes?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type UserProductAccessAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which UserProductAccess to aggregate.
     */
    where?: Prisma.UserProductAccessWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of UserProductAccesses to fetch.
     */
    orderBy?: Prisma.UserProductAccessOrderByWithRelationInput | Prisma.UserProductAccessOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.UserProductAccessWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` UserProductAccesses from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` UserProductAccesses.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned UserProductAccesses
    **/
    _count?: true | UserProductAccessCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: UserProductAccessAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: UserProductAccessSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: UserProductAccessMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: UserProductAccessMaxAggregateInputType;
};
export type GetUserProductAccessAggregateType<T extends UserProductAccessAggregateArgs> = {
    [P in keyof T & keyof AggregateUserProductAccess]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUserProductAccess[P]> : Prisma.GetScalarType<T[P], AggregateUserProductAccess[P]>;
};
export type UserProductAccessGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserProductAccessWhereInput;
    orderBy?: Prisma.UserProductAccessOrderByWithAggregationInput | Prisma.UserProductAccessOrderByWithAggregationInput[];
    by: Prisma.UserProductAccessScalarFieldEnum[] | Prisma.UserProductAccessScalarFieldEnum;
    having?: Prisma.UserProductAccessScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserProductAccessCountAggregateInputType | true;
    _avg?: UserProductAccessAvgAggregateInputType;
    _sum?: UserProductAccessSumAggregateInputType;
    _min?: UserProductAccessMinAggregateInputType;
    _max?: UserProductAccessMaxAggregateInputType;
};
export type UserProductAccessGroupByOutputType = {
    id: string;
    userId: string;
    orderId: string;
    orderItemId: string;
    productId: string;
    productType: string;
    email: string | null;
    password: string | null;
    licenseKey: string | null;
    accessUrl: string | null;
    downloadUrl: string | null;
    courseProgress: number | null;
    courseStatus: string | null;
    subscriptionStatus: string | null;
    expiresAt: Date | null;
    metadata: string | null;
    notes: string | null;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    _count: UserProductAccessCountAggregateOutputType | null;
    _avg: UserProductAccessAvgAggregateOutputType | null;
    _sum: UserProductAccessSumAggregateOutputType | null;
    _min: UserProductAccessMinAggregateOutputType | null;
    _max: UserProductAccessMaxAggregateOutputType | null;
};
type GetUserProductAccessGroupByPayload<T extends UserProductAccessGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UserProductAccessGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UserProductAccessGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UserProductAccessGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UserProductAccessGroupByOutputType[P]>;
}>>;
export type UserProductAccessWhereInput = {
    AND?: Prisma.UserProductAccessWhereInput | Prisma.UserProductAccessWhereInput[];
    OR?: Prisma.UserProductAccessWhereInput[];
    NOT?: Prisma.UserProductAccessWhereInput | Prisma.UserProductAccessWhereInput[];
    id?: Prisma.StringFilter<"UserProductAccess"> | string;
    userId?: Prisma.StringFilter<"UserProductAccess"> | string;
    orderId?: Prisma.StringFilter<"UserProductAccess"> | string;
    orderItemId?: Prisma.StringFilter<"UserProductAccess"> | string;
    productId?: Prisma.StringFilter<"UserProductAccess"> | string;
    productType?: Prisma.StringFilter<"UserProductAccess"> | string;
    email?: Prisma.StringNullableFilter<"UserProductAccess"> | string | null;
    password?: Prisma.StringNullableFilter<"UserProductAccess"> | string | null;
    licenseKey?: Prisma.StringNullableFilter<"UserProductAccess"> | string | null;
    accessUrl?: Prisma.StringNullableFilter<"UserProductAccess"> | string | null;
    downloadUrl?: Prisma.StringNullableFilter<"UserProductAccess"> | string | null;
    courseProgress?: Prisma.IntNullableFilter<"UserProductAccess"> | number | null;
    courseStatus?: Prisma.StringNullableFilter<"UserProductAccess"> | string | null;
    subscriptionStatus?: Prisma.StringNullableFilter<"UserProductAccess"> | string | null;
    expiresAt?: Prisma.DateTimeNullableFilter<"UserProductAccess"> | Date | string | null;
    metadata?: Prisma.StringNullableFilter<"UserProductAccess"> | string | null;
    notes?: Prisma.StringNullableFilter<"UserProductAccess"> | string | null;
    status?: Prisma.StringFilter<"UserProductAccess"> | string;
    createdAt?: Prisma.DateTimeFilter<"UserProductAccess"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"UserProductAccess"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    order?: Prisma.XOR<Prisma.OrderScalarRelationFilter, Prisma.OrderWhereInput>;
    orderItem?: Prisma.XOR<Prisma.OrderItemScalarRelationFilter, Prisma.OrderItemWhereInput>;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
    lessonCompletions?: Prisma.CourseLessonCompletionListRelationFilter;
};
export type UserProductAccessOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    orderItemId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    productType?: Prisma.SortOrder;
    email?: Prisma.SortOrderInput | Prisma.SortOrder;
    password?: Prisma.SortOrderInput | Prisma.SortOrder;
    licenseKey?: Prisma.SortOrderInput | Prisma.SortOrder;
    accessUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    downloadUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    courseProgress?: Prisma.SortOrderInput | Prisma.SortOrder;
    courseStatus?: Prisma.SortOrderInput | Prisma.SortOrder;
    subscriptionStatus?: Prisma.SortOrderInput | Prisma.SortOrder;
    expiresAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    metadata?: Prisma.SortOrderInput | Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    order?: Prisma.OrderOrderByWithRelationInput;
    orderItem?: Prisma.OrderItemOrderByWithRelationInput;
    product?: Prisma.ProductOrderByWithRelationInput;
    lessonCompletions?: Prisma.CourseLessonCompletionOrderByRelationAggregateInput;
};
export type UserProductAccessWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    orderItemId?: string;
    AND?: Prisma.UserProductAccessWhereInput | Prisma.UserProductAccessWhereInput[];
    OR?: Prisma.UserProductAccessWhereInput[];
    NOT?: Prisma.UserProductAccessWhereInput | Prisma.UserProductAccessWhereInput[];
    userId?: Prisma.StringFilter<"UserProductAccess"> | string;
    orderId?: Prisma.StringFilter<"UserProductAccess"> | string;
    productId?: Prisma.StringFilter<"UserProductAccess"> | string;
    productType?: Prisma.StringFilter<"UserProductAccess"> | string;
    email?: Prisma.StringNullableFilter<"UserProductAccess"> | string | null;
    password?: Prisma.StringNullableFilter<"UserProductAccess"> | string | null;
    licenseKey?: Prisma.StringNullableFilter<"UserProductAccess"> | string | null;
    accessUrl?: Prisma.StringNullableFilter<"UserProductAccess"> | string | null;
    downloadUrl?: Prisma.StringNullableFilter<"UserProductAccess"> | string | null;
    courseProgress?: Prisma.IntNullableFilter<"UserProductAccess"> | number | null;
    courseStatus?: Prisma.StringNullableFilter<"UserProductAccess"> | string | null;
    subscriptionStatus?: Prisma.StringNullableFilter<"UserProductAccess"> | string | null;
    expiresAt?: Prisma.DateTimeNullableFilter<"UserProductAccess"> | Date | string | null;
    metadata?: Prisma.StringNullableFilter<"UserProductAccess"> | string | null;
    notes?: Prisma.StringNullableFilter<"UserProductAccess"> | string | null;
    status?: Prisma.StringFilter<"UserProductAccess"> | string;
    createdAt?: Prisma.DateTimeFilter<"UserProductAccess"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"UserProductAccess"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    order?: Prisma.XOR<Prisma.OrderScalarRelationFilter, Prisma.OrderWhereInput>;
    orderItem?: Prisma.XOR<Prisma.OrderItemScalarRelationFilter, Prisma.OrderItemWhereInput>;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
    lessonCompletions?: Prisma.CourseLessonCompletionListRelationFilter;
}, "id" | "orderItemId">;
export type UserProductAccessOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    orderItemId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    productType?: Prisma.SortOrder;
    email?: Prisma.SortOrderInput | Prisma.SortOrder;
    password?: Prisma.SortOrderInput | Prisma.SortOrder;
    licenseKey?: Prisma.SortOrderInput | Prisma.SortOrder;
    accessUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    downloadUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    courseProgress?: Prisma.SortOrderInput | Prisma.SortOrder;
    courseStatus?: Prisma.SortOrderInput | Prisma.SortOrder;
    subscriptionStatus?: Prisma.SortOrderInput | Prisma.SortOrder;
    expiresAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    metadata?: Prisma.SortOrderInput | Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.UserProductAccessCountOrderByAggregateInput;
    _avg?: Prisma.UserProductAccessAvgOrderByAggregateInput;
    _max?: Prisma.UserProductAccessMaxOrderByAggregateInput;
    _min?: Prisma.UserProductAccessMinOrderByAggregateInput;
    _sum?: Prisma.UserProductAccessSumOrderByAggregateInput;
};
export type UserProductAccessScalarWhereWithAggregatesInput = {
    AND?: Prisma.UserProductAccessScalarWhereWithAggregatesInput | Prisma.UserProductAccessScalarWhereWithAggregatesInput[];
    OR?: Prisma.UserProductAccessScalarWhereWithAggregatesInput[];
    NOT?: Prisma.UserProductAccessScalarWhereWithAggregatesInput | Prisma.UserProductAccessScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"UserProductAccess"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"UserProductAccess"> | string;
    orderId?: Prisma.StringWithAggregatesFilter<"UserProductAccess"> | string;
    orderItemId?: Prisma.StringWithAggregatesFilter<"UserProductAccess"> | string;
    productId?: Prisma.StringWithAggregatesFilter<"UserProductAccess"> | string;
    productType?: Prisma.StringWithAggregatesFilter<"UserProductAccess"> | string;
    email?: Prisma.StringNullableWithAggregatesFilter<"UserProductAccess"> | string | null;
    password?: Prisma.StringNullableWithAggregatesFilter<"UserProductAccess"> | string | null;
    licenseKey?: Prisma.StringNullableWithAggregatesFilter<"UserProductAccess"> | string | null;
    accessUrl?: Prisma.StringNullableWithAggregatesFilter<"UserProductAccess"> | string | null;
    downloadUrl?: Prisma.StringNullableWithAggregatesFilter<"UserProductAccess"> | string | null;
    courseProgress?: Prisma.IntNullableWithAggregatesFilter<"UserProductAccess"> | number | null;
    courseStatus?: Prisma.StringNullableWithAggregatesFilter<"UserProductAccess"> | string | null;
    subscriptionStatus?: Prisma.StringNullableWithAggregatesFilter<"UserProductAccess"> | string | null;
    expiresAt?: Prisma.DateTimeNullableWithAggregatesFilter<"UserProductAccess"> | Date | string | null;
    metadata?: Prisma.StringNullableWithAggregatesFilter<"UserProductAccess"> | string | null;
    notes?: Prisma.StringNullableWithAggregatesFilter<"UserProductAccess"> | string | null;
    status?: Prisma.StringWithAggregatesFilter<"UserProductAccess"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"UserProductAccess"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"UserProductAccess"> | Date | string;
};
export type UserProductAccessCreateInput = {
    id?: string;
    productType: string;
    email?: string | null;
    password?: string | null;
    licenseKey?: string | null;
    accessUrl?: string | null;
    downloadUrl?: string | null;
    courseProgress?: number | null;
    courseStatus?: string | null;
    subscriptionStatus?: string | null;
    expiresAt?: Date | string | null;
    metadata?: string | null;
    notes?: string | null;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutProductAccessInput;
    order: Prisma.OrderCreateNestedOneWithoutUserAccessInput;
    orderItem: Prisma.OrderItemCreateNestedOneWithoutUserAccessInput;
    product: Prisma.ProductCreateNestedOneWithoutUserAccessInput;
    lessonCompletions?: Prisma.CourseLessonCompletionCreateNestedManyWithoutUserProductAccessInput;
};
export type UserProductAccessUncheckedCreateInput = {
    id?: string;
    userId: string;
    orderId: string;
    orderItemId: string;
    productId: string;
    productType: string;
    email?: string | null;
    password?: string | null;
    licenseKey?: string | null;
    accessUrl?: string | null;
    downloadUrl?: string | null;
    courseProgress?: number | null;
    courseStatus?: string | null;
    subscriptionStatus?: string | null;
    expiresAt?: Date | string | null;
    metadata?: string | null;
    notes?: string | null;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    lessonCompletions?: Prisma.CourseLessonCompletionUncheckedCreateNestedManyWithoutUserProductAccessInput;
};
export type UserProductAccessUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productType?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    password?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    licenseKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    accessUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    downloadUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    courseProgress?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    courseStatus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    subscriptionStatus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    metadata?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutProductAccessNestedInput;
    order?: Prisma.OrderUpdateOneRequiredWithoutUserAccessNestedInput;
    orderItem?: Prisma.OrderItemUpdateOneRequiredWithoutUserAccessNestedInput;
    product?: Prisma.ProductUpdateOneRequiredWithoutUserAccessNestedInput;
    lessonCompletions?: Prisma.CourseLessonCompletionUpdateManyWithoutUserProductAccessNestedInput;
};
export type UserProductAccessUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    orderItemId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    productType?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    password?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    licenseKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    accessUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    downloadUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    courseProgress?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    courseStatus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    subscriptionStatus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    metadata?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lessonCompletions?: Prisma.CourseLessonCompletionUncheckedUpdateManyWithoutUserProductAccessNestedInput;
};
export type UserProductAccessCreateManyInput = {
    id?: string;
    userId: string;
    orderId: string;
    orderItemId: string;
    productId: string;
    productType: string;
    email?: string | null;
    password?: string | null;
    licenseKey?: string | null;
    accessUrl?: string | null;
    downloadUrl?: string | null;
    courseProgress?: number | null;
    courseStatus?: string | null;
    subscriptionStatus?: string | null;
    expiresAt?: Date | string | null;
    metadata?: string | null;
    notes?: string | null;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserProductAccessUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productType?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    password?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    licenseKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    accessUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    downloadUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    courseProgress?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    courseStatus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    subscriptionStatus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    metadata?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserProductAccessUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    orderItemId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    productType?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    password?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    licenseKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    accessUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    downloadUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    courseProgress?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    courseStatus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    subscriptionStatus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    metadata?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserProductAccessListRelationFilter = {
    every?: Prisma.UserProductAccessWhereInput;
    some?: Prisma.UserProductAccessWhereInput;
    none?: Prisma.UserProductAccessWhereInput;
};
export type UserProductAccessOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type UserProductAccessNullableScalarRelationFilter = {
    is?: Prisma.UserProductAccessWhereInput | null;
    isNot?: Prisma.UserProductAccessWhereInput | null;
};
export type UserProductAccessCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    orderItemId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    productType?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    licenseKey?: Prisma.SortOrder;
    accessUrl?: Prisma.SortOrder;
    downloadUrl?: Prisma.SortOrder;
    courseProgress?: Prisma.SortOrder;
    courseStatus?: Prisma.SortOrder;
    subscriptionStatus?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    metadata?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserProductAccessAvgOrderByAggregateInput = {
    courseProgress?: Prisma.SortOrder;
};
export type UserProductAccessMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    orderItemId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    productType?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    licenseKey?: Prisma.SortOrder;
    accessUrl?: Prisma.SortOrder;
    downloadUrl?: Prisma.SortOrder;
    courseProgress?: Prisma.SortOrder;
    courseStatus?: Prisma.SortOrder;
    subscriptionStatus?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    metadata?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserProductAccessMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    orderItemId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    productType?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    licenseKey?: Prisma.SortOrder;
    accessUrl?: Prisma.SortOrder;
    downloadUrl?: Prisma.SortOrder;
    courseProgress?: Prisma.SortOrder;
    courseStatus?: Prisma.SortOrder;
    subscriptionStatus?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    metadata?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserProductAccessSumOrderByAggregateInput = {
    courseProgress?: Prisma.SortOrder;
};
export type UserProductAccessScalarRelationFilter = {
    is?: Prisma.UserProductAccessWhereInput;
    isNot?: Prisma.UserProductAccessWhereInput;
};
export type UserProductAccessCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.UserProductAccessCreateWithoutProductInput, Prisma.UserProductAccessUncheckedCreateWithoutProductInput> | Prisma.UserProductAccessCreateWithoutProductInput[] | Prisma.UserProductAccessUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.UserProductAccessCreateOrConnectWithoutProductInput | Prisma.UserProductAccessCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.UserProductAccessCreateManyProductInputEnvelope;
    connect?: Prisma.UserProductAccessWhereUniqueInput | Prisma.UserProductAccessWhereUniqueInput[];
};
export type UserProductAccessUncheckedCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.UserProductAccessCreateWithoutProductInput, Prisma.UserProductAccessUncheckedCreateWithoutProductInput> | Prisma.UserProductAccessCreateWithoutProductInput[] | Prisma.UserProductAccessUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.UserProductAccessCreateOrConnectWithoutProductInput | Prisma.UserProductAccessCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.UserProductAccessCreateManyProductInputEnvelope;
    connect?: Prisma.UserProductAccessWhereUniqueInput | Prisma.UserProductAccessWhereUniqueInput[];
};
export type UserProductAccessUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.UserProductAccessCreateWithoutProductInput, Prisma.UserProductAccessUncheckedCreateWithoutProductInput> | Prisma.UserProductAccessCreateWithoutProductInput[] | Prisma.UserProductAccessUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.UserProductAccessCreateOrConnectWithoutProductInput | Prisma.UserProductAccessCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.UserProductAccessUpsertWithWhereUniqueWithoutProductInput | Prisma.UserProductAccessUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.UserProductAccessCreateManyProductInputEnvelope;
    set?: Prisma.UserProductAccessWhereUniqueInput | Prisma.UserProductAccessWhereUniqueInput[];
    disconnect?: Prisma.UserProductAccessWhereUniqueInput | Prisma.UserProductAccessWhereUniqueInput[];
    delete?: Prisma.UserProductAccessWhereUniqueInput | Prisma.UserProductAccessWhereUniqueInput[];
    connect?: Prisma.UserProductAccessWhereUniqueInput | Prisma.UserProductAccessWhereUniqueInput[];
    update?: Prisma.UserProductAccessUpdateWithWhereUniqueWithoutProductInput | Prisma.UserProductAccessUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.UserProductAccessUpdateManyWithWhereWithoutProductInput | Prisma.UserProductAccessUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.UserProductAccessScalarWhereInput | Prisma.UserProductAccessScalarWhereInput[];
};
export type UserProductAccessUncheckedUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.UserProductAccessCreateWithoutProductInput, Prisma.UserProductAccessUncheckedCreateWithoutProductInput> | Prisma.UserProductAccessCreateWithoutProductInput[] | Prisma.UserProductAccessUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.UserProductAccessCreateOrConnectWithoutProductInput | Prisma.UserProductAccessCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.UserProductAccessUpsertWithWhereUniqueWithoutProductInput | Prisma.UserProductAccessUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.UserProductAccessCreateManyProductInputEnvelope;
    set?: Prisma.UserProductAccessWhereUniqueInput | Prisma.UserProductAccessWhereUniqueInput[];
    disconnect?: Prisma.UserProductAccessWhereUniqueInput | Prisma.UserProductAccessWhereUniqueInput[];
    delete?: Prisma.UserProductAccessWhereUniqueInput | Prisma.UserProductAccessWhereUniqueInput[];
    connect?: Prisma.UserProductAccessWhereUniqueInput | Prisma.UserProductAccessWhereUniqueInput[];
    update?: Prisma.UserProductAccessUpdateWithWhereUniqueWithoutProductInput | Prisma.UserProductAccessUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.UserProductAccessUpdateManyWithWhereWithoutProductInput | Prisma.UserProductAccessUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.UserProductAccessScalarWhereInput | Prisma.UserProductAccessScalarWhereInput[];
};
export type UserProductAccessCreateNestedManyWithoutOrderInput = {
    create?: Prisma.XOR<Prisma.UserProductAccessCreateWithoutOrderInput, Prisma.UserProductAccessUncheckedCreateWithoutOrderInput> | Prisma.UserProductAccessCreateWithoutOrderInput[] | Prisma.UserProductAccessUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.UserProductAccessCreateOrConnectWithoutOrderInput | Prisma.UserProductAccessCreateOrConnectWithoutOrderInput[];
    createMany?: Prisma.UserProductAccessCreateManyOrderInputEnvelope;
    connect?: Prisma.UserProductAccessWhereUniqueInput | Prisma.UserProductAccessWhereUniqueInput[];
};
export type UserProductAccessUncheckedCreateNestedManyWithoutOrderInput = {
    create?: Prisma.XOR<Prisma.UserProductAccessCreateWithoutOrderInput, Prisma.UserProductAccessUncheckedCreateWithoutOrderInput> | Prisma.UserProductAccessCreateWithoutOrderInput[] | Prisma.UserProductAccessUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.UserProductAccessCreateOrConnectWithoutOrderInput | Prisma.UserProductAccessCreateOrConnectWithoutOrderInput[];
    createMany?: Prisma.UserProductAccessCreateManyOrderInputEnvelope;
    connect?: Prisma.UserProductAccessWhereUniqueInput | Prisma.UserProductAccessWhereUniqueInput[];
};
export type UserProductAccessUpdateManyWithoutOrderNestedInput = {
    create?: Prisma.XOR<Prisma.UserProductAccessCreateWithoutOrderInput, Prisma.UserProductAccessUncheckedCreateWithoutOrderInput> | Prisma.UserProductAccessCreateWithoutOrderInput[] | Prisma.UserProductAccessUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.UserProductAccessCreateOrConnectWithoutOrderInput | Prisma.UserProductAccessCreateOrConnectWithoutOrderInput[];
    upsert?: Prisma.UserProductAccessUpsertWithWhereUniqueWithoutOrderInput | Prisma.UserProductAccessUpsertWithWhereUniqueWithoutOrderInput[];
    createMany?: Prisma.UserProductAccessCreateManyOrderInputEnvelope;
    set?: Prisma.UserProductAccessWhereUniqueInput | Prisma.UserProductAccessWhereUniqueInput[];
    disconnect?: Prisma.UserProductAccessWhereUniqueInput | Prisma.UserProductAccessWhereUniqueInput[];
    delete?: Prisma.UserProductAccessWhereUniqueInput | Prisma.UserProductAccessWhereUniqueInput[];
    connect?: Prisma.UserProductAccessWhereUniqueInput | Prisma.UserProductAccessWhereUniqueInput[];
    update?: Prisma.UserProductAccessUpdateWithWhereUniqueWithoutOrderInput | Prisma.UserProductAccessUpdateWithWhereUniqueWithoutOrderInput[];
    updateMany?: Prisma.UserProductAccessUpdateManyWithWhereWithoutOrderInput | Prisma.UserProductAccessUpdateManyWithWhereWithoutOrderInput[];
    deleteMany?: Prisma.UserProductAccessScalarWhereInput | Prisma.UserProductAccessScalarWhereInput[];
};
export type UserProductAccessUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: Prisma.XOR<Prisma.UserProductAccessCreateWithoutOrderInput, Prisma.UserProductAccessUncheckedCreateWithoutOrderInput> | Prisma.UserProductAccessCreateWithoutOrderInput[] | Prisma.UserProductAccessUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.UserProductAccessCreateOrConnectWithoutOrderInput | Prisma.UserProductAccessCreateOrConnectWithoutOrderInput[];
    upsert?: Prisma.UserProductAccessUpsertWithWhereUniqueWithoutOrderInput | Prisma.UserProductAccessUpsertWithWhereUniqueWithoutOrderInput[];
    createMany?: Prisma.UserProductAccessCreateManyOrderInputEnvelope;
    set?: Prisma.UserProductAccessWhereUniqueInput | Prisma.UserProductAccessWhereUniqueInput[];
    disconnect?: Prisma.UserProductAccessWhereUniqueInput | Prisma.UserProductAccessWhereUniqueInput[];
    delete?: Prisma.UserProductAccessWhereUniqueInput | Prisma.UserProductAccessWhereUniqueInput[];
    connect?: Prisma.UserProductAccessWhereUniqueInput | Prisma.UserProductAccessWhereUniqueInput[];
    update?: Prisma.UserProductAccessUpdateWithWhereUniqueWithoutOrderInput | Prisma.UserProductAccessUpdateWithWhereUniqueWithoutOrderInput[];
    updateMany?: Prisma.UserProductAccessUpdateManyWithWhereWithoutOrderInput | Prisma.UserProductAccessUpdateManyWithWhereWithoutOrderInput[];
    deleteMany?: Prisma.UserProductAccessScalarWhereInput | Prisma.UserProductAccessScalarWhereInput[];
};
export type UserProductAccessCreateNestedOneWithoutOrderItemInput = {
    create?: Prisma.XOR<Prisma.UserProductAccessCreateWithoutOrderItemInput, Prisma.UserProductAccessUncheckedCreateWithoutOrderItemInput>;
    connectOrCreate?: Prisma.UserProductAccessCreateOrConnectWithoutOrderItemInput;
    connect?: Prisma.UserProductAccessWhereUniqueInput;
};
export type UserProductAccessUncheckedCreateNestedOneWithoutOrderItemInput = {
    create?: Prisma.XOR<Prisma.UserProductAccessCreateWithoutOrderItemInput, Prisma.UserProductAccessUncheckedCreateWithoutOrderItemInput>;
    connectOrCreate?: Prisma.UserProductAccessCreateOrConnectWithoutOrderItemInput;
    connect?: Prisma.UserProductAccessWhereUniqueInput;
};
export type UserProductAccessUpdateOneWithoutOrderItemNestedInput = {
    create?: Prisma.XOR<Prisma.UserProductAccessCreateWithoutOrderItemInput, Prisma.UserProductAccessUncheckedCreateWithoutOrderItemInput>;
    connectOrCreate?: Prisma.UserProductAccessCreateOrConnectWithoutOrderItemInput;
    upsert?: Prisma.UserProductAccessUpsertWithoutOrderItemInput;
    disconnect?: Prisma.UserProductAccessWhereInput | boolean;
    delete?: Prisma.UserProductAccessWhereInput | boolean;
    connect?: Prisma.UserProductAccessWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserProductAccessUpdateToOneWithWhereWithoutOrderItemInput, Prisma.UserProductAccessUpdateWithoutOrderItemInput>, Prisma.UserProductAccessUncheckedUpdateWithoutOrderItemInput>;
};
export type UserProductAccessUncheckedUpdateOneWithoutOrderItemNestedInput = {
    create?: Prisma.XOR<Prisma.UserProductAccessCreateWithoutOrderItemInput, Prisma.UserProductAccessUncheckedCreateWithoutOrderItemInput>;
    connectOrCreate?: Prisma.UserProductAccessCreateOrConnectWithoutOrderItemInput;
    upsert?: Prisma.UserProductAccessUpsertWithoutOrderItemInput;
    disconnect?: Prisma.UserProductAccessWhereInput | boolean;
    delete?: Prisma.UserProductAccessWhereInput | boolean;
    connect?: Prisma.UserProductAccessWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserProductAccessUpdateToOneWithWhereWithoutOrderItemInput, Prisma.UserProductAccessUpdateWithoutOrderItemInput>, Prisma.UserProductAccessUncheckedUpdateWithoutOrderItemInput>;
};
export type UserProductAccessCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.UserProductAccessCreateWithoutUserInput, Prisma.UserProductAccessUncheckedCreateWithoutUserInput> | Prisma.UserProductAccessCreateWithoutUserInput[] | Prisma.UserProductAccessUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.UserProductAccessCreateOrConnectWithoutUserInput | Prisma.UserProductAccessCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.UserProductAccessCreateManyUserInputEnvelope;
    connect?: Prisma.UserProductAccessWhereUniqueInput | Prisma.UserProductAccessWhereUniqueInput[];
};
export type UserProductAccessUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.UserProductAccessCreateWithoutUserInput, Prisma.UserProductAccessUncheckedCreateWithoutUserInput> | Prisma.UserProductAccessCreateWithoutUserInput[] | Prisma.UserProductAccessUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.UserProductAccessCreateOrConnectWithoutUserInput | Prisma.UserProductAccessCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.UserProductAccessCreateManyUserInputEnvelope;
    connect?: Prisma.UserProductAccessWhereUniqueInput | Prisma.UserProductAccessWhereUniqueInput[];
};
export type UserProductAccessUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.UserProductAccessCreateWithoutUserInput, Prisma.UserProductAccessUncheckedCreateWithoutUserInput> | Prisma.UserProductAccessCreateWithoutUserInput[] | Prisma.UserProductAccessUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.UserProductAccessCreateOrConnectWithoutUserInput | Prisma.UserProductAccessCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.UserProductAccessUpsertWithWhereUniqueWithoutUserInput | Prisma.UserProductAccessUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.UserProductAccessCreateManyUserInputEnvelope;
    set?: Prisma.UserProductAccessWhereUniqueInput | Prisma.UserProductAccessWhereUniqueInput[];
    disconnect?: Prisma.UserProductAccessWhereUniqueInput | Prisma.UserProductAccessWhereUniqueInput[];
    delete?: Prisma.UserProductAccessWhereUniqueInput | Prisma.UserProductAccessWhereUniqueInput[];
    connect?: Prisma.UserProductAccessWhereUniqueInput | Prisma.UserProductAccessWhereUniqueInput[];
    update?: Prisma.UserProductAccessUpdateWithWhereUniqueWithoutUserInput | Prisma.UserProductAccessUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.UserProductAccessUpdateManyWithWhereWithoutUserInput | Prisma.UserProductAccessUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.UserProductAccessScalarWhereInput | Prisma.UserProductAccessScalarWhereInput[];
};
export type UserProductAccessUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.UserProductAccessCreateWithoutUserInput, Prisma.UserProductAccessUncheckedCreateWithoutUserInput> | Prisma.UserProductAccessCreateWithoutUserInput[] | Prisma.UserProductAccessUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.UserProductAccessCreateOrConnectWithoutUserInput | Prisma.UserProductAccessCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.UserProductAccessUpsertWithWhereUniqueWithoutUserInput | Prisma.UserProductAccessUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.UserProductAccessCreateManyUserInputEnvelope;
    set?: Prisma.UserProductAccessWhereUniqueInput | Prisma.UserProductAccessWhereUniqueInput[];
    disconnect?: Prisma.UserProductAccessWhereUniqueInput | Prisma.UserProductAccessWhereUniqueInput[];
    delete?: Prisma.UserProductAccessWhereUniqueInput | Prisma.UserProductAccessWhereUniqueInput[];
    connect?: Prisma.UserProductAccessWhereUniqueInput | Prisma.UserProductAccessWhereUniqueInput[];
    update?: Prisma.UserProductAccessUpdateWithWhereUniqueWithoutUserInput | Prisma.UserProductAccessUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.UserProductAccessUpdateManyWithWhereWithoutUserInput | Prisma.UserProductAccessUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.UserProductAccessScalarWhereInput | Prisma.UserProductAccessScalarWhereInput[];
};
export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type UserProductAccessCreateNestedOneWithoutLessonCompletionsInput = {
    create?: Prisma.XOR<Prisma.UserProductAccessCreateWithoutLessonCompletionsInput, Prisma.UserProductAccessUncheckedCreateWithoutLessonCompletionsInput>;
    connectOrCreate?: Prisma.UserProductAccessCreateOrConnectWithoutLessonCompletionsInput;
    connect?: Prisma.UserProductAccessWhereUniqueInput;
};
export type UserProductAccessUpdateOneRequiredWithoutLessonCompletionsNestedInput = {
    create?: Prisma.XOR<Prisma.UserProductAccessCreateWithoutLessonCompletionsInput, Prisma.UserProductAccessUncheckedCreateWithoutLessonCompletionsInput>;
    connectOrCreate?: Prisma.UserProductAccessCreateOrConnectWithoutLessonCompletionsInput;
    upsert?: Prisma.UserProductAccessUpsertWithoutLessonCompletionsInput;
    connect?: Prisma.UserProductAccessWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserProductAccessUpdateToOneWithWhereWithoutLessonCompletionsInput, Prisma.UserProductAccessUpdateWithoutLessonCompletionsInput>, Prisma.UserProductAccessUncheckedUpdateWithoutLessonCompletionsInput>;
};
export type UserProductAccessCreateWithoutProductInput = {
    id?: string;
    productType: string;
    email?: string | null;
    password?: string | null;
    licenseKey?: string | null;
    accessUrl?: string | null;
    downloadUrl?: string | null;
    courseProgress?: number | null;
    courseStatus?: string | null;
    subscriptionStatus?: string | null;
    expiresAt?: Date | string | null;
    metadata?: string | null;
    notes?: string | null;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutProductAccessInput;
    order: Prisma.OrderCreateNestedOneWithoutUserAccessInput;
    orderItem: Prisma.OrderItemCreateNestedOneWithoutUserAccessInput;
    lessonCompletions?: Prisma.CourseLessonCompletionCreateNestedManyWithoutUserProductAccessInput;
};
export type UserProductAccessUncheckedCreateWithoutProductInput = {
    id?: string;
    userId: string;
    orderId: string;
    orderItemId: string;
    productType: string;
    email?: string | null;
    password?: string | null;
    licenseKey?: string | null;
    accessUrl?: string | null;
    downloadUrl?: string | null;
    courseProgress?: number | null;
    courseStatus?: string | null;
    subscriptionStatus?: string | null;
    expiresAt?: Date | string | null;
    metadata?: string | null;
    notes?: string | null;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    lessonCompletions?: Prisma.CourseLessonCompletionUncheckedCreateNestedManyWithoutUserProductAccessInput;
};
export type UserProductAccessCreateOrConnectWithoutProductInput = {
    where: Prisma.UserProductAccessWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserProductAccessCreateWithoutProductInput, Prisma.UserProductAccessUncheckedCreateWithoutProductInput>;
};
export type UserProductAccessCreateManyProductInputEnvelope = {
    data: Prisma.UserProductAccessCreateManyProductInput | Prisma.UserProductAccessCreateManyProductInput[];
    skipDuplicates?: boolean;
};
export type UserProductAccessUpsertWithWhereUniqueWithoutProductInput = {
    where: Prisma.UserProductAccessWhereUniqueInput;
    update: Prisma.XOR<Prisma.UserProductAccessUpdateWithoutProductInput, Prisma.UserProductAccessUncheckedUpdateWithoutProductInput>;
    create: Prisma.XOR<Prisma.UserProductAccessCreateWithoutProductInput, Prisma.UserProductAccessUncheckedCreateWithoutProductInput>;
};
export type UserProductAccessUpdateWithWhereUniqueWithoutProductInput = {
    where: Prisma.UserProductAccessWhereUniqueInput;
    data: Prisma.XOR<Prisma.UserProductAccessUpdateWithoutProductInput, Prisma.UserProductAccessUncheckedUpdateWithoutProductInput>;
};
export type UserProductAccessUpdateManyWithWhereWithoutProductInput = {
    where: Prisma.UserProductAccessScalarWhereInput;
    data: Prisma.XOR<Prisma.UserProductAccessUpdateManyMutationInput, Prisma.UserProductAccessUncheckedUpdateManyWithoutProductInput>;
};
export type UserProductAccessScalarWhereInput = {
    AND?: Prisma.UserProductAccessScalarWhereInput | Prisma.UserProductAccessScalarWhereInput[];
    OR?: Prisma.UserProductAccessScalarWhereInput[];
    NOT?: Prisma.UserProductAccessScalarWhereInput | Prisma.UserProductAccessScalarWhereInput[];
    id?: Prisma.StringFilter<"UserProductAccess"> | string;
    userId?: Prisma.StringFilter<"UserProductAccess"> | string;
    orderId?: Prisma.StringFilter<"UserProductAccess"> | string;
    orderItemId?: Prisma.StringFilter<"UserProductAccess"> | string;
    productId?: Prisma.StringFilter<"UserProductAccess"> | string;
    productType?: Prisma.StringFilter<"UserProductAccess"> | string;
    email?: Prisma.StringNullableFilter<"UserProductAccess"> | string | null;
    password?: Prisma.StringNullableFilter<"UserProductAccess"> | string | null;
    licenseKey?: Prisma.StringNullableFilter<"UserProductAccess"> | string | null;
    accessUrl?: Prisma.StringNullableFilter<"UserProductAccess"> | string | null;
    downloadUrl?: Prisma.StringNullableFilter<"UserProductAccess"> | string | null;
    courseProgress?: Prisma.IntNullableFilter<"UserProductAccess"> | number | null;
    courseStatus?: Prisma.StringNullableFilter<"UserProductAccess"> | string | null;
    subscriptionStatus?: Prisma.StringNullableFilter<"UserProductAccess"> | string | null;
    expiresAt?: Prisma.DateTimeNullableFilter<"UserProductAccess"> | Date | string | null;
    metadata?: Prisma.StringNullableFilter<"UserProductAccess"> | string | null;
    notes?: Prisma.StringNullableFilter<"UserProductAccess"> | string | null;
    status?: Prisma.StringFilter<"UserProductAccess"> | string;
    createdAt?: Prisma.DateTimeFilter<"UserProductAccess"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"UserProductAccess"> | Date | string;
};
export type UserProductAccessCreateWithoutOrderInput = {
    id?: string;
    productType: string;
    email?: string | null;
    password?: string | null;
    licenseKey?: string | null;
    accessUrl?: string | null;
    downloadUrl?: string | null;
    courseProgress?: number | null;
    courseStatus?: string | null;
    subscriptionStatus?: string | null;
    expiresAt?: Date | string | null;
    metadata?: string | null;
    notes?: string | null;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutProductAccessInput;
    orderItem: Prisma.OrderItemCreateNestedOneWithoutUserAccessInput;
    product: Prisma.ProductCreateNestedOneWithoutUserAccessInput;
    lessonCompletions?: Prisma.CourseLessonCompletionCreateNestedManyWithoutUserProductAccessInput;
};
export type UserProductAccessUncheckedCreateWithoutOrderInput = {
    id?: string;
    userId: string;
    orderItemId: string;
    productId: string;
    productType: string;
    email?: string | null;
    password?: string | null;
    licenseKey?: string | null;
    accessUrl?: string | null;
    downloadUrl?: string | null;
    courseProgress?: number | null;
    courseStatus?: string | null;
    subscriptionStatus?: string | null;
    expiresAt?: Date | string | null;
    metadata?: string | null;
    notes?: string | null;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    lessonCompletions?: Prisma.CourseLessonCompletionUncheckedCreateNestedManyWithoutUserProductAccessInput;
};
export type UserProductAccessCreateOrConnectWithoutOrderInput = {
    where: Prisma.UserProductAccessWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserProductAccessCreateWithoutOrderInput, Prisma.UserProductAccessUncheckedCreateWithoutOrderInput>;
};
export type UserProductAccessCreateManyOrderInputEnvelope = {
    data: Prisma.UserProductAccessCreateManyOrderInput | Prisma.UserProductAccessCreateManyOrderInput[];
    skipDuplicates?: boolean;
};
export type UserProductAccessUpsertWithWhereUniqueWithoutOrderInput = {
    where: Prisma.UserProductAccessWhereUniqueInput;
    update: Prisma.XOR<Prisma.UserProductAccessUpdateWithoutOrderInput, Prisma.UserProductAccessUncheckedUpdateWithoutOrderInput>;
    create: Prisma.XOR<Prisma.UserProductAccessCreateWithoutOrderInput, Prisma.UserProductAccessUncheckedCreateWithoutOrderInput>;
};
export type UserProductAccessUpdateWithWhereUniqueWithoutOrderInput = {
    where: Prisma.UserProductAccessWhereUniqueInput;
    data: Prisma.XOR<Prisma.UserProductAccessUpdateWithoutOrderInput, Prisma.UserProductAccessUncheckedUpdateWithoutOrderInput>;
};
export type UserProductAccessUpdateManyWithWhereWithoutOrderInput = {
    where: Prisma.UserProductAccessScalarWhereInput;
    data: Prisma.XOR<Prisma.UserProductAccessUpdateManyMutationInput, Prisma.UserProductAccessUncheckedUpdateManyWithoutOrderInput>;
};
export type UserProductAccessCreateWithoutOrderItemInput = {
    id?: string;
    productType: string;
    email?: string | null;
    password?: string | null;
    licenseKey?: string | null;
    accessUrl?: string | null;
    downloadUrl?: string | null;
    courseProgress?: number | null;
    courseStatus?: string | null;
    subscriptionStatus?: string | null;
    expiresAt?: Date | string | null;
    metadata?: string | null;
    notes?: string | null;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutProductAccessInput;
    order: Prisma.OrderCreateNestedOneWithoutUserAccessInput;
    product: Prisma.ProductCreateNestedOneWithoutUserAccessInput;
    lessonCompletions?: Prisma.CourseLessonCompletionCreateNestedManyWithoutUserProductAccessInput;
};
export type UserProductAccessUncheckedCreateWithoutOrderItemInput = {
    id?: string;
    userId: string;
    orderId: string;
    productId: string;
    productType: string;
    email?: string | null;
    password?: string | null;
    licenseKey?: string | null;
    accessUrl?: string | null;
    downloadUrl?: string | null;
    courseProgress?: number | null;
    courseStatus?: string | null;
    subscriptionStatus?: string | null;
    expiresAt?: Date | string | null;
    metadata?: string | null;
    notes?: string | null;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    lessonCompletions?: Prisma.CourseLessonCompletionUncheckedCreateNestedManyWithoutUserProductAccessInput;
};
export type UserProductAccessCreateOrConnectWithoutOrderItemInput = {
    where: Prisma.UserProductAccessWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserProductAccessCreateWithoutOrderItemInput, Prisma.UserProductAccessUncheckedCreateWithoutOrderItemInput>;
};
export type UserProductAccessUpsertWithoutOrderItemInput = {
    update: Prisma.XOR<Prisma.UserProductAccessUpdateWithoutOrderItemInput, Prisma.UserProductAccessUncheckedUpdateWithoutOrderItemInput>;
    create: Prisma.XOR<Prisma.UserProductAccessCreateWithoutOrderItemInput, Prisma.UserProductAccessUncheckedCreateWithoutOrderItemInput>;
    where?: Prisma.UserProductAccessWhereInput;
};
export type UserProductAccessUpdateToOneWithWhereWithoutOrderItemInput = {
    where?: Prisma.UserProductAccessWhereInput;
    data: Prisma.XOR<Prisma.UserProductAccessUpdateWithoutOrderItemInput, Prisma.UserProductAccessUncheckedUpdateWithoutOrderItemInput>;
};
export type UserProductAccessUpdateWithoutOrderItemInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productType?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    password?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    licenseKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    accessUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    downloadUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    courseProgress?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    courseStatus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    subscriptionStatus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    metadata?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutProductAccessNestedInput;
    order?: Prisma.OrderUpdateOneRequiredWithoutUserAccessNestedInput;
    product?: Prisma.ProductUpdateOneRequiredWithoutUserAccessNestedInput;
    lessonCompletions?: Prisma.CourseLessonCompletionUpdateManyWithoutUserProductAccessNestedInput;
};
export type UserProductAccessUncheckedUpdateWithoutOrderItemInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    productType?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    password?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    licenseKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    accessUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    downloadUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    courseProgress?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    courseStatus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    subscriptionStatus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    metadata?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lessonCompletions?: Prisma.CourseLessonCompletionUncheckedUpdateManyWithoutUserProductAccessNestedInput;
};
export type UserProductAccessCreateWithoutUserInput = {
    id?: string;
    productType: string;
    email?: string | null;
    password?: string | null;
    licenseKey?: string | null;
    accessUrl?: string | null;
    downloadUrl?: string | null;
    courseProgress?: number | null;
    courseStatus?: string | null;
    subscriptionStatus?: string | null;
    expiresAt?: Date | string | null;
    metadata?: string | null;
    notes?: string | null;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    order: Prisma.OrderCreateNestedOneWithoutUserAccessInput;
    orderItem: Prisma.OrderItemCreateNestedOneWithoutUserAccessInput;
    product: Prisma.ProductCreateNestedOneWithoutUserAccessInput;
    lessonCompletions?: Prisma.CourseLessonCompletionCreateNestedManyWithoutUserProductAccessInput;
};
export type UserProductAccessUncheckedCreateWithoutUserInput = {
    id?: string;
    orderId: string;
    orderItemId: string;
    productId: string;
    productType: string;
    email?: string | null;
    password?: string | null;
    licenseKey?: string | null;
    accessUrl?: string | null;
    downloadUrl?: string | null;
    courseProgress?: number | null;
    courseStatus?: string | null;
    subscriptionStatus?: string | null;
    expiresAt?: Date | string | null;
    metadata?: string | null;
    notes?: string | null;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    lessonCompletions?: Prisma.CourseLessonCompletionUncheckedCreateNestedManyWithoutUserProductAccessInput;
};
export type UserProductAccessCreateOrConnectWithoutUserInput = {
    where: Prisma.UserProductAccessWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserProductAccessCreateWithoutUserInput, Prisma.UserProductAccessUncheckedCreateWithoutUserInput>;
};
export type UserProductAccessCreateManyUserInputEnvelope = {
    data: Prisma.UserProductAccessCreateManyUserInput | Prisma.UserProductAccessCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type UserProductAccessUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.UserProductAccessWhereUniqueInput;
    update: Prisma.XOR<Prisma.UserProductAccessUpdateWithoutUserInput, Prisma.UserProductAccessUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.UserProductAccessCreateWithoutUserInput, Prisma.UserProductAccessUncheckedCreateWithoutUserInput>;
};
export type UserProductAccessUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.UserProductAccessWhereUniqueInput;
    data: Prisma.XOR<Prisma.UserProductAccessUpdateWithoutUserInput, Prisma.UserProductAccessUncheckedUpdateWithoutUserInput>;
};
export type UserProductAccessUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.UserProductAccessScalarWhereInput;
    data: Prisma.XOR<Prisma.UserProductAccessUpdateManyMutationInput, Prisma.UserProductAccessUncheckedUpdateManyWithoutUserInput>;
};
export type UserProductAccessCreateWithoutLessonCompletionsInput = {
    id?: string;
    productType: string;
    email?: string | null;
    password?: string | null;
    licenseKey?: string | null;
    accessUrl?: string | null;
    downloadUrl?: string | null;
    courseProgress?: number | null;
    courseStatus?: string | null;
    subscriptionStatus?: string | null;
    expiresAt?: Date | string | null;
    metadata?: string | null;
    notes?: string | null;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutProductAccessInput;
    order: Prisma.OrderCreateNestedOneWithoutUserAccessInput;
    orderItem: Prisma.OrderItemCreateNestedOneWithoutUserAccessInput;
    product: Prisma.ProductCreateNestedOneWithoutUserAccessInput;
};
export type UserProductAccessUncheckedCreateWithoutLessonCompletionsInput = {
    id?: string;
    userId: string;
    orderId: string;
    orderItemId: string;
    productId: string;
    productType: string;
    email?: string | null;
    password?: string | null;
    licenseKey?: string | null;
    accessUrl?: string | null;
    downloadUrl?: string | null;
    courseProgress?: number | null;
    courseStatus?: string | null;
    subscriptionStatus?: string | null;
    expiresAt?: Date | string | null;
    metadata?: string | null;
    notes?: string | null;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserProductAccessCreateOrConnectWithoutLessonCompletionsInput = {
    where: Prisma.UserProductAccessWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserProductAccessCreateWithoutLessonCompletionsInput, Prisma.UserProductAccessUncheckedCreateWithoutLessonCompletionsInput>;
};
export type UserProductAccessUpsertWithoutLessonCompletionsInput = {
    update: Prisma.XOR<Prisma.UserProductAccessUpdateWithoutLessonCompletionsInput, Prisma.UserProductAccessUncheckedUpdateWithoutLessonCompletionsInput>;
    create: Prisma.XOR<Prisma.UserProductAccessCreateWithoutLessonCompletionsInput, Prisma.UserProductAccessUncheckedCreateWithoutLessonCompletionsInput>;
    where?: Prisma.UserProductAccessWhereInput;
};
export type UserProductAccessUpdateToOneWithWhereWithoutLessonCompletionsInput = {
    where?: Prisma.UserProductAccessWhereInput;
    data: Prisma.XOR<Prisma.UserProductAccessUpdateWithoutLessonCompletionsInput, Prisma.UserProductAccessUncheckedUpdateWithoutLessonCompletionsInput>;
};
export type UserProductAccessUpdateWithoutLessonCompletionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productType?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    password?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    licenseKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    accessUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    downloadUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    courseProgress?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    courseStatus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    subscriptionStatus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    metadata?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutProductAccessNestedInput;
    order?: Prisma.OrderUpdateOneRequiredWithoutUserAccessNestedInput;
    orderItem?: Prisma.OrderItemUpdateOneRequiredWithoutUserAccessNestedInput;
    product?: Prisma.ProductUpdateOneRequiredWithoutUserAccessNestedInput;
};
export type UserProductAccessUncheckedUpdateWithoutLessonCompletionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    orderItemId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    productType?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    password?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    licenseKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    accessUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    downloadUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    courseProgress?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    courseStatus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    subscriptionStatus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    metadata?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserProductAccessCreateManyProductInput = {
    id?: string;
    userId: string;
    orderId: string;
    orderItemId: string;
    productType: string;
    email?: string | null;
    password?: string | null;
    licenseKey?: string | null;
    accessUrl?: string | null;
    downloadUrl?: string | null;
    courseProgress?: number | null;
    courseStatus?: string | null;
    subscriptionStatus?: string | null;
    expiresAt?: Date | string | null;
    metadata?: string | null;
    notes?: string | null;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserProductAccessUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productType?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    password?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    licenseKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    accessUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    downloadUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    courseProgress?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    courseStatus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    subscriptionStatus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    metadata?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutProductAccessNestedInput;
    order?: Prisma.OrderUpdateOneRequiredWithoutUserAccessNestedInput;
    orderItem?: Prisma.OrderItemUpdateOneRequiredWithoutUserAccessNestedInput;
    lessonCompletions?: Prisma.CourseLessonCompletionUpdateManyWithoutUserProductAccessNestedInput;
};
export type UserProductAccessUncheckedUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    orderItemId?: Prisma.StringFieldUpdateOperationsInput | string;
    productType?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    password?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    licenseKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    accessUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    downloadUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    courseProgress?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    courseStatus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    subscriptionStatus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    metadata?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lessonCompletions?: Prisma.CourseLessonCompletionUncheckedUpdateManyWithoutUserProductAccessNestedInput;
};
export type UserProductAccessUncheckedUpdateManyWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    orderItemId?: Prisma.StringFieldUpdateOperationsInput | string;
    productType?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    password?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    licenseKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    accessUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    downloadUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    courseProgress?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    courseStatus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    subscriptionStatus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    metadata?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserProductAccessCreateManyOrderInput = {
    id?: string;
    userId: string;
    orderItemId: string;
    productId: string;
    productType: string;
    email?: string | null;
    password?: string | null;
    licenseKey?: string | null;
    accessUrl?: string | null;
    downloadUrl?: string | null;
    courseProgress?: number | null;
    courseStatus?: string | null;
    subscriptionStatus?: string | null;
    expiresAt?: Date | string | null;
    metadata?: string | null;
    notes?: string | null;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserProductAccessUpdateWithoutOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productType?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    password?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    licenseKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    accessUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    downloadUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    courseProgress?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    courseStatus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    subscriptionStatus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    metadata?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutProductAccessNestedInput;
    orderItem?: Prisma.OrderItemUpdateOneRequiredWithoutUserAccessNestedInput;
    product?: Prisma.ProductUpdateOneRequiredWithoutUserAccessNestedInput;
    lessonCompletions?: Prisma.CourseLessonCompletionUpdateManyWithoutUserProductAccessNestedInput;
};
export type UserProductAccessUncheckedUpdateWithoutOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    orderItemId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    productType?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    password?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    licenseKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    accessUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    downloadUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    courseProgress?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    courseStatus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    subscriptionStatus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    metadata?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lessonCompletions?: Prisma.CourseLessonCompletionUncheckedUpdateManyWithoutUserProductAccessNestedInput;
};
export type UserProductAccessUncheckedUpdateManyWithoutOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    orderItemId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    productType?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    password?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    licenseKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    accessUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    downloadUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    courseProgress?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    courseStatus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    subscriptionStatus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    metadata?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserProductAccessCreateManyUserInput = {
    id?: string;
    orderId: string;
    orderItemId: string;
    productId: string;
    productType: string;
    email?: string | null;
    password?: string | null;
    licenseKey?: string | null;
    accessUrl?: string | null;
    downloadUrl?: string | null;
    courseProgress?: number | null;
    courseStatus?: string | null;
    subscriptionStatus?: string | null;
    expiresAt?: Date | string | null;
    metadata?: string | null;
    notes?: string | null;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserProductAccessUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productType?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    password?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    licenseKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    accessUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    downloadUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    courseProgress?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    courseStatus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    subscriptionStatus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    metadata?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    order?: Prisma.OrderUpdateOneRequiredWithoutUserAccessNestedInput;
    orderItem?: Prisma.OrderItemUpdateOneRequiredWithoutUserAccessNestedInput;
    product?: Prisma.ProductUpdateOneRequiredWithoutUserAccessNestedInput;
    lessonCompletions?: Prisma.CourseLessonCompletionUpdateManyWithoutUserProductAccessNestedInput;
};
export type UserProductAccessUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    orderItemId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    productType?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    password?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    licenseKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    accessUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    downloadUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    courseProgress?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    courseStatus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    subscriptionStatus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    metadata?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lessonCompletions?: Prisma.CourseLessonCompletionUncheckedUpdateManyWithoutUserProductAccessNestedInput;
};
export type UserProductAccessUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    orderItemId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    productType?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    password?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    licenseKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    accessUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    downloadUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    courseProgress?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    courseStatus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    subscriptionStatus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    metadata?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
/**
 * Count Type UserProductAccessCountOutputType
 */
export type UserProductAccessCountOutputType = {
    lessonCompletions: number;
};
export type UserProductAccessCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    lessonCompletions?: boolean | UserProductAccessCountOutputTypeCountLessonCompletionsArgs;
};
/**
 * UserProductAccessCountOutputType without action
 */
export type UserProductAccessCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProductAccessCountOutputType
     */
    select?: Prisma.UserProductAccessCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * UserProductAccessCountOutputType without action
 */
export type UserProductAccessCountOutputTypeCountLessonCompletionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CourseLessonCompletionWhereInput;
};
export type UserProductAccessSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    orderId?: boolean;
    orderItemId?: boolean;
    productId?: boolean;
    productType?: boolean;
    email?: boolean;
    password?: boolean;
    licenseKey?: boolean;
    accessUrl?: boolean;
    downloadUrl?: boolean;
    courseProgress?: boolean;
    courseStatus?: boolean;
    subscriptionStatus?: boolean;
    expiresAt?: boolean;
    metadata?: boolean;
    notes?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
    orderItem?: boolean | Prisma.OrderItemDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    lessonCompletions?: boolean | Prisma.UserProductAccess$lessonCompletionsArgs<ExtArgs>;
    _count?: boolean | Prisma.UserProductAccessCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["userProductAccess"]>;
export type UserProductAccessSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    orderId?: boolean;
    orderItemId?: boolean;
    productId?: boolean;
    productType?: boolean;
    email?: boolean;
    password?: boolean;
    licenseKey?: boolean;
    accessUrl?: boolean;
    downloadUrl?: boolean;
    courseProgress?: boolean;
    courseStatus?: boolean;
    subscriptionStatus?: boolean;
    expiresAt?: boolean;
    metadata?: boolean;
    notes?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
    orderItem?: boolean | Prisma.OrderItemDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["userProductAccess"]>;
export type UserProductAccessSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    orderId?: boolean;
    orderItemId?: boolean;
    productId?: boolean;
    productType?: boolean;
    email?: boolean;
    password?: boolean;
    licenseKey?: boolean;
    accessUrl?: boolean;
    downloadUrl?: boolean;
    courseProgress?: boolean;
    courseStatus?: boolean;
    subscriptionStatus?: boolean;
    expiresAt?: boolean;
    metadata?: boolean;
    notes?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
    orderItem?: boolean | Prisma.OrderItemDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["userProductAccess"]>;
export type UserProductAccessSelectScalar = {
    id?: boolean;
    userId?: boolean;
    orderId?: boolean;
    orderItemId?: boolean;
    productId?: boolean;
    productType?: boolean;
    email?: boolean;
    password?: boolean;
    licenseKey?: boolean;
    accessUrl?: boolean;
    downloadUrl?: boolean;
    courseProgress?: boolean;
    courseStatus?: boolean;
    subscriptionStatus?: boolean;
    expiresAt?: boolean;
    metadata?: boolean;
    notes?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type UserProductAccessOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "orderId" | "orderItemId" | "productId" | "productType" | "email" | "password" | "licenseKey" | "accessUrl" | "downloadUrl" | "courseProgress" | "courseStatus" | "subscriptionStatus" | "expiresAt" | "metadata" | "notes" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["userProductAccess"]>;
export type UserProductAccessInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
    orderItem?: boolean | Prisma.OrderItemDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    lessonCompletions?: boolean | Prisma.UserProductAccess$lessonCompletionsArgs<ExtArgs>;
    _count?: boolean | Prisma.UserProductAccessCountOutputTypeDefaultArgs<ExtArgs>;
};
export type UserProductAccessIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
    orderItem?: boolean | Prisma.OrderItemDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
};
export type UserProductAccessIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
    orderItem?: boolean | Prisma.OrderItemDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
};
export type $UserProductAccessPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "UserProductAccess";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        order: Prisma.$OrderPayload<ExtArgs>;
        orderItem: Prisma.$OrderItemPayload<ExtArgs>;
        product: Prisma.$ProductPayload<ExtArgs>;
        lessonCompletions: Prisma.$CourseLessonCompletionPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        orderId: string;
        orderItemId: string;
        productId: string;
        productType: string;
        email: string | null;
        password: string | null;
        licenseKey: string | null;
        accessUrl: string | null;
        downloadUrl: string | null;
        courseProgress: number | null;
        courseStatus: string | null;
        subscriptionStatus: string | null;
        expiresAt: Date | null;
        metadata: string | null;
        notes: string | null;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["userProductAccess"]>;
    composites: {};
};
export type UserProductAccessGetPayload<S extends boolean | null | undefined | UserProductAccessDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UserProductAccessPayload, S>;
export type UserProductAccessCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<UserProductAccessFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UserProductAccessCountAggregateInputType | true;
};
export interface UserProductAccessDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['UserProductAccess'];
        meta: {
            name: 'UserProductAccess';
        };
    };
    /**
     * Find zero or one UserProductAccess that matches the filter.
     * @param {UserProductAccessFindUniqueArgs} args - Arguments to find a UserProductAccess
     * @example
     * // Get one UserProductAccess
     * const userProductAccess = await prisma.userProductAccess.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserProductAccessFindUniqueArgs>(args: Prisma.SelectSubset<T, UserProductAccessFindUniqueArgs<ExtArgs>>): Prisma.Prisma__UserProductAccessClient<runtime.Types.Result.GetResult<Prisma.$UserProductAccessPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one UserProductAccess that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserProductAccessFindUniqueOrThrowArgs} args - Arguments to find a UserProductAccess
     * @example
     * // Get one UserProductAccess
     * const userProductAccess = await prisma.userProductAccess.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserProductAccessFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, UserProductAccessFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserProductAccessClient<runtime.Types.Result.GetResult<Prisma.$UserProductAccessPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first UserProductAccess that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProductAccessFindFirstArgs} args - Arguments to find a UserProductAccess
     * @example
     * // Get one UserProductAccess
     * const userProductAccess = await prisma.userProductAccess.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserProductAccessFindFirstArgs>(args?: Prisma.SelectSubset<T, UserProductAccessFindFirstArgs<ExtArgs>>): Prisma.Prisma__UserProductAccessClient<runtime.Types.Result.GetResult<Prisma.$UserProductAccessPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first UserProductAccess that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProductAccessFindFirstOrThrowArgs} args - Arguments to find a UserProductAccess
     * @example
     * // Get one UserProductAccess
     * const userProductAccess = await prisma.userProductAccess.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserProductAccessFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, UserProductAccessFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserProductAccessClient<runtime.Types.Result.GetResult<Prisma.$UserProductAccessPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more UserProductAccesses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProductAccessFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserProductAccesses
     * const userProductAccesses = await prisma.userProductAccess.findMany()
     *
     * // Get first 10 UserProductAccesses
     * const userProductAccesses = await prisma.userProductAccess.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const userProductAccessWithIdOnly = await prisma.userProductAccess.findMany({ select: { id: true } })
     *
     */
    findMany<T extends UserProductAccessFindManyArgs>(args?: Prisma.SelectSubset<T, UserProductAccessFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserProductAccessPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a UserProductAccess.
     * @param {UserProductAccessCreateArgs} args - Arguments to create a UserProductAccess.
     * @example
     * // Create one UserProductAccess
     * const UserProductAccess = await prisma.userProductAccess.create({
     *   data: {
     *     // ... data to create a UserProductAccess
     *   }
     * })
     *
     */
    create<T extends UserProductAccessCreateArgs>(args: Prisma.SelectSubset<T, UserProductAccessCreateArgs<ExtArgs>>): Prisma.Prisma__UserProductAccessClient<runtime.Types.Result.GetResult<Prisma.$UserProductAccessPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many UserProductAccesses.
     * @param {UserProductAccessCreateManyArgs} args - Arguments to create many UserProductAccesses.
     * @example
     * // Create many UserProductAccesses
     * const userProductAccess = await prisma.userProductAccess.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends UserProductAccessCreateManyArgs>(args?: Prisma.SelectSubset<T, UserProductAccessCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many UserProductAccesses and returns the data saved in the database.
     * @param {UserProductAccessCreateManyAndReturnArgs} args - Arguments to create many UserProductAccesses.
     * @example
     * // Create many UserProductAccesses
     * const userProductAccess = await prisma.userProductAccess.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many UserProductAccesses and only return the `id`
     * const userProductAccessWithIdOnly = await prisma.userProductAccess.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends UserProductAccessCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, UserProductAccessCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserProductAccessPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a UserProductAccess.
     * @param {UserProductAccessDeleteArgs} args - Arguments to delete one UserProductAccess.
     * @example
     * // Delete one UserProductAccess
     * const UserProductAccess = await prisma.userProductAccess.delete({
     *   where: {
     *     // ... filter to delete one UserProductAccess
     *   }
     * })
     *
     */
    delete<T extends UserProductAccessDeleteArgs>(args: Prisma.SelectSubset<T, UserProductAccessDeleteArgs<ExtArgs>>): Prisma.Prisma__UserProductAccessClient<runtime.Types.Result.GetResult<Prisma.$UserProductAccessPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one UserProductAccess.
     * @param {UserProductAccessUpdateArgs} args - Arguments to update one UserProductAccess.
     * @example
     * // Update one UserProductAccess
     * const userProductAccess = await prisma.userProductAccess.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends UserProductAccessUpdateArgs>(args: Prisma.SelectSubset<T, UserProductAccessUpdateArgs<ExtArgs>>): Prisma.Prisma__UserProductAccessClient<runtime.Types.Result.GetResult<Prisma.$UserProductAccessPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more UserProductAccesses.
     * @param {UserProductAccessDeleteManyArgs} args - Arguments to filter UserProductAccesses to delete.
     * @example
     * // Delete a few UserProductAccesses
     * const { count } = await prisma.userProductAccess.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends UserProductAccessDeleteManyArgs>(args?: Prisma.SelectSubset<T, UserProductAccessDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more UserProductAccesses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProductAccessUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserProductAccesses
     * const userProductAccess = await prisma.userProductAccess.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends UserProductAccessUpdateManyArgs>(args: Prisma.SelectSubset<T, UserProductAccessUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more UserProductAccesses and returns the data updated in the database.
     * @param {UserProductAccessUpdateManyAndReturnArgs} args - Arguments to update many UserProductAccesses.
     * @example
     * // Update many UserProductAccesses
     * const userProductAccess = await prisma.userProductAccess.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more UserProductAccesses and only return the `id`
     * const userProductAccessWithIdOnly = await prisma.userProductAccess.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends UserProductAccessUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, UserProductAccessUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserProductAccessPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one UserProductAccess.
     * @param {UserProductAccessUpsertArgs} args - Arguments to update or create a UserProductAccess.
     * @example
     * // Update or create a UserProductAccess
     * const userProductAccess = await prisma.userProductAccess.upsert({
     *   create: {
     *     // ... data to create a UserProductAccess
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserProductAccess we want to update
     *   }
     * })
     */
    upsert<T extends UserProductAccessUpsertArgs>(args: Prisma.SelectSubset<T, UserProductAccessUpsertArgs<ExtArgs>>): Prisma.Prisma__UserProductAccessClient<runtime.Types.Result.GetResult<Prisma.$UserProductAccessPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of UserProductAccesses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProductAccessCountArgs} args - Arguments to filter UserProductAccesses to count.
     * @example
     * // Count the number of UserProductAccesses
     * const count = await prisma.userProductAccess.count({
     *   where: {
     *     // ... the filter for the UserProductAccesses we want to count
     *   }
     * })
    **/
    count<T extends UserProductAccessCountArgs>(args?: Prisma.Subset<T, UserProductAccessCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UserProductAccessCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a UserProductAccess.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProductAccessAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserProductAccessAggregateArgs>(args: Prisma.Subset<T, UserProductAccessAggregateArgs>): Prisma.PrismaPromise<GetUserProductAccessAggregateType<T>>;
    /**
     * Group by UserProductAccess.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProductAccessGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends UserProductAccessGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: UserProductAccessGroupByArgs['orderBy'];
    } : {
        orderBy?: UserProductAccessGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, UserProductAccessGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserProductAccessGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the UserProductAccess model
     */
    readonly fields: UserProductAccessFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for UserProductAccess.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__UserProductAccessClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    order<T extends Prisma.OrderDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OrderDefaultArgs<ExtArgs>>): Prisma.Prisma__OrderClient<runtime.Types.Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    orderItem<T extends Prisma.OrderItemDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OrderItemDefaultArgs<ExtArgs>>): Prisma.Prisma__OrderItemClient<runtime.Types.Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    product<T extends Prisma.ProductDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductDefaultArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    lessonCompletions<T extends Prisma.UserProductAccess$lessonCompletionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserProductAccess$lessonCompletionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CourseLessonCompletionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the UserProductAccess model
 */
export interface UserProductAccessFieldRefs {
    readonly id: Prisma.FieldRef<"UserProductAccess", 'String'>;
    readonly userId: Prisma.FieldRef<"UserProductAccess", 'String'>;
    readonly orderId: Prisma.FieldRef<"UserProductAccess", 'String'>;
    readonly orderItemId: Prisma.FieldRef<"UserProductAccess", 'String'>;
    readonly productId: Prisma.FieldRef<"UserProductAccess", 'String'>;
    readonly productType: Prisma.FieldRef<"UserProductAccess", 'String'>;
    readonly email: Prisma.FieldRef<"UserProductAccess", 'String'>;
    readonly password: Prisma.FieldRef<"UserProductAccess", 'String'>;
    readonly licenseKey: Prisma.FieldRef<"UserProductAccess", 'String'>;
    readonly accessUrl: Prisma.FieldRef<"UserProductAccess", 'String'>;
    readonly downloadUrl: Prisma.FieldRef<"UserProductAccess", 'String'>;
    readonly courseProgress: Prisma.FieldRef<"UserProductAccess", 'Int'>;
    readonly courseStatus: Prisma.FieldRef<"UserProductAccess", 'String'>;
    readonly subscriptionStatus: Prisma.FieldRef<"UserProductAccess", 'String'>;
    readonly expiresAt: Prisma.FieldRef<"UserProductAccess", 'DateTime'>;
    readonly metadata: Prisma.FieldRef<"UserProductAccess", 'String'>;
    readonly notes: Prisma.FieldRef<"UserProductAccess", 'String'>;
    readonly status: Prisma.FieldRef<"UserProductAccess", 'String'>;
    readonly createdAt: Prisma.FieldRef<"UserProductAccess", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"UserProductAccess", 'DateTime'>;
}
/**
 * UserProductAccess findUnique
 */
export type UserProductAccessFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProductAccess
     */
    select?: Prisma.UserProductAccessSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserProductAccess
     */
    omit?: Prisma.UserProductAccessOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserProductAccessInclude<ExtArgs> | null;
    /**
     * Filter, which UserProductAccess to fetch.
     */
    where: Prisma.UserProductAccessWhereUniqueInput;
};
/**
 * UserProductAccess findUniqueOrThrow
 */
export type UserProductAccessFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProductAccess
     */
    select?: Prisma.UserProductAccessSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserProductAccess
     */
    omit?: Prisma.UserProductAccessOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserProductAccessInclude<ExtArgs> | null;
    /**
     * Filter, which UserProductAccess to fetch.
     */
    where: Prisma.UserProductAccessWhereUniqueInput;
};
/**
 * UserProductAccess findFirst
 */
export type UserProductAccessFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProductAccess
     */
    select?: Prisma.UserProductAccessSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserProductAccess
     */
    omit?: Prisma.UserProductAccessOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserProductAccessInclude<ExtArgs> | null;
    /**
     * Filter, which UserProductAccess to fetch.
     */
    where?: Prisma.UserProductAccessWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of UserProductAccesses to fetch.
     */
    orderBy?: Prisma.UserProductAccessOrderByWithRelationInput | Prisma.UserProductAccessOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for UserProductAccesses.
     */
    cursor?: Prisma.UserProductAccessWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` UserProductAccesses from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` UserProductAccesses.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of UserProductAccesses.
     */
    distinct?: Prisma.UserProductAccessScalarFieldEnum | Prisma.UserProductAccessScalarFieldEnum[];
};
/**
 * UserProductAccess findFirstOrThrow
 */
export type UserProductAccessFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProductAccess
     */
    select?: Prisma.UserProductAccessSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserProductAccess
     */
    omit?: Prisma.UserProductAccessOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserProductAccessInclude<ExtArgs> | null;
    /**
     * Filter, which UserProductAccess to fetch.
     */
    where?: Prisma.UserProductAccessWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of UserProductAccesses to fetch.
     */
    orderBy?: Prisma.UserProductAccessOrderByWithRelationInput | Prisma.UserProductAccessOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for UserProductAccesses.
     */
    cursor?: Prisma.UserProductAccessWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` UserProductAccesses from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` UserProductAccesses.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of UserProductAccesses.
     */
    distinct?: Prisma.UserProductAccessScalarFieldEnum | Prisma.UserProductAccessScalarFieldEnum[];
};
/**
 * UserProductAccess findMany
 */
export type UserProductAccessFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProductAccess
     */
    select?: Prisma.UserProductAccessSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserProductAccess
     */
    omit?: Prisma.UserProductAccessOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserProductAccessInclude<ExtArgs> | null;
    /**
     * Filter, which UserProductAccesses to fetch.
     */
    where?: Prisma.UserProductAccessWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of UserProductAccesses to fetch.
     */
    orderBy?: Prisma.UserProductAccessOrderByWithRelationInput | Prisma.UserProductAccessOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing UserProductAccesses.
     */
    cursor?: Prisma.UserProductAccessWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` UserProductAccesses from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` UserProductAccesses.
     */
    skip?: number;
    distinct?: Prisma.UserProductAccessScalarFieldEnum | Prisma.UserProductAccessScalarFieldEnum[];
};
/**
 * UserProductAccess create
 */
export type UserProductAccessCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProductAccess
     */
    select?: Prisma.UserProductAccessSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserProductAccess
     */
    omit?: Prisma.UserProductAccessOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserProductAccessInclude<ExtArgs> | null;
    /**
     * The data needed to create a UserProductAccess.
     */
    data: Prisma.XOR<Prisma.UserProductAccessCreateInput, Prisma.UserProductAccessUncheckedCreateInput>;
};
/**
 * UserProductAccess createMany
 */
export type UserProductAccessCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserProductAccesses.
     */
    data: Prisma.UserProductAccessCreateManyInput | Prisma.UserProductAccessCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * UserProductAccess createManyAndReturn
 */
export type UserProductAccessCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProductAccess
     */
    select?: Prisma.UserProductAccessSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the UserProductAccess
     */
    omit?: Prisma.UserProductAccessOmit<ExtArgs> | null;
    /**
     * The data used to create many UserProductAccesses.
     */
    data: Prisma.UserProductAccessCreateManyInput | Prisma.UserProductAccessCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserProductAccessIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * UserProductAccess update
 */
export type UserProductAccessUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProductAccess
     */
    select?: Prisma.UserProductAccessSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserProductAccess
     */
    omit?: Prisma.UserProductAccessOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserProductAccessInclude<ExtArgs> | null;
    /**
     * The data needed to update a UserProductAccess.
     */
    data: Prisma.XOR<Prisma.UserProductAccessUpdateInput, Prisma.UserProductAccessUncheckedUpdateInput>;
    /**
     * Choose, which UserProductAccess to update.
     */
    where: Prisma.UserProductAccessWhereUniqueInput;
};
/**
 * UserProductAccess updateMany
 */
export type UserProductAccessUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update UserProductAccesses.
     */
    data: Prisma.XOR<Prisma.UserProductAccessUpdateManyMutationInput, Prisma.UserProductAccessUncheckedUpdateManyInput>;
    /**
     * Filter which UserProductAccesses to update
     */
    where?: Prisma.UserProductAccessWhereInput;
    /**
     * Limit how many UserProductAccesses to update.
     */
    limit?: number;
};
/**
 * UserProductAccess updateManyAndReturn
 */
export type UserProductAccessUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProductAccess
     */
    select?: Prisma.UserProductAccessSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the UserProductAccess
     */
    omit?: Prisma.UserProductAccessOmit<ExtArgs> | null;
    /**
     * The data used to update UserProductAccesses.
     */
    data: Prisma.XOR<Prisma.UserProductAccessUpdateManyMutationInput, Prisma.UserProductAccessUncheckedUpdateManyInput>;
    /**
     * Filter which UserProductAccesses to update
     */
    where?: Prisma.UserProductAccessWhereInput;
    /**
     * Limit how many UserProductAccesses to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserProductAccessIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * UserProductAccess upsert
 */
export type UserProductAccessUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProductAccess
     */
    select?: Prisma.UserProductAccessSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserProductAccess
     */
    omit?: Prisma.UserProductAccessOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserProductAccessInclude<ExtArgs> | null;
    /**
     * The filter to search for the UserProductAccess to update in case it exists.
     */
    where: Prisma.UserProductAccessWhereUniqueInput;
    /**
     * In case the UserProductAccess found by the `where` argument doesn't exist, create a new UserProductAccess with this data.
     */
    create: Prisma.XOR<Prisma.UserProductAccessCreateInput, Prisma.UserProductAccessUncheckedCreateInput>;
    /**
     * In case the UserProductAccess was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.UserProductAccessUpdateInput, Prisma.UserProductAccessUncheckedUpdateInput>;
};
/**
 * UserProductAccess delete
 */
export type UserProductAccessDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProductAccess
     */
    select?: Prisma.UserProductAccessSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserProductAccess
     */
    omit?: Prisma.UserProductAccessOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserProductAccessInclude<ExtArgs> | null;
    /**
     * Filter which UserProductAccess to delete.
     */
    where: Prisma.UserProductAccessWhereUniqueInput;
};
/**
 * UserProductAccess deleteMany
 */
export type UserProductAccessDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which UserProductAccesses to delete
     */
    where?: Prisma.UserProductAccessWhereInput;
    /**
     * Limit how many UserProductAccesses to delete.
     */
    limit?: number;
};
/**
 * UserProductAccess.lessonCompletions
 */
export type UserProductAccess$lessonCompletionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseLessonCompletion
     */
    select?: Prisma.CourseLessonCompletionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CourseLessonCompletion
     */
    omit?: Prisma.CourseLessonCompletionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CourseLessonCompletionInclude<ExtArgs> | null;
    where?: Prisma.CourseLessonCompletionWhereInput;
    orderBy?: Prisma.CourseLessonCompletionOrderByWithRelationInput | Prisma.CourseLessonCompletionOrderByWithRelationInput[];
    cursor?: Prisma.CourseLessonCompletionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CourseLessonCompletionScalarFieldEnum | Prisma.CourseLessonCompletionScalarFieldEnum[];
};
/**
 * UserProductAccess without action
 */
export type UserProductAccessDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProductAccess
     */
    select?: Prisma.UserProductAccessSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserProductAccess
     */
    omit?: Prisma.UserProductAccessOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserProductAccessInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=UserProductAccess.d.ts.map