import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model ProductCredentials
 *
 */
export type ProductCredentialsModel = runtime.Types.Result.DefaultSelection<Prisma.$ProductCredentialsPayload>;
export type AggregateProductCredentials = {
    _count: ProductCredentialsCountAggregateOutputType | null;
    _min: ProductCredentialsMinAggregateOutputType | null;
    _max: ProductCredentialsMaxAggregateOutputType | null;
};
export type ProductCredentialsMinAggregateOutputType = {
    id: string | null;
    productId: string | null;
    productType: string | null;
    email: string | null;
    password: string | null;
    licenseKey: string | null;
    accessUrl: string | null;
    downloadUrl: string | null;
    subscriptionStatus: string | null;
    expiresAt: Date | null;
    metadata: string | null;
    notes: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ProductCredentialsMaxAggregateOutputType = {
    id: string | null;
    productId: string | null;
    productType: string | null;
    email: string | null;
    password: string | null;
    licenseKey: string | null;
    accessUrl: string | null;
    downloadUrl: string | null;
    subscriptionStatus: string | null;
    expiresAt: Date | null;
    metadata: string | null;
    notes: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ProductCredentialsCountAggregateOutputType = {
    id: number;
    productId: number;
    productType: number;
    email: number;
    password: number;
    licenseKey: number;
    accessUrl: number;
    downloadUrl: number;
    subscriptionStatus: number;
    expiresAt: number;
    metadata: number;
    notes: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type ProductCredentialsMinAggregateInputType = {
    id?: true;
    productId?: true;
    productType?: true;
    email?: true;
    password?: true;
    licenseKey?: true;
    accessUrl?: true;
    downloadUrl?: true;
    subscriptionStatus?: true;
    expiresAt?: true;
    metadata?: true;
    notes?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ProductCredentialsMaxAggregateInputType = {
    id?: true;
    productId?: true;
    productType?: true;
    email?: true;
    password?: true;
    licenseKey?: true;
    accessUrl?: true;
    downloadUrl?: true;
    subscriptionStatus?: true;
    expiresAt?: true;
    metadata?: true;
    notes?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ProductCredentialsCountAggregateInputType = {
    id?: true;
    productId?: true;
    productType?: true;
    email?: true;
    password?: true;
    licenseKey?: true;
    accessUrl?: true;
    downloadUrl?: true;
    subscriptionStatus?: true;
    expiresAt?: true;
    metadata?: true;
    notes?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type ProductCredentialsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which ProductCredentials to aggregate.
     */
    where?: Prisma.ProductCredentialsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ProductCredentials to fetch.
     */
    orderBy?: Prisma.ProductCredentialsOrderByWithRelationInput | Prisma.ProductCredentialsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.ProductCredentialsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ProductCredentials from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ProductCredentials.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned ProductCredentials
    **/
    _count?: true | ProductCredentialsCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: ProductCredentialsMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: ProductCredentialsMaxAggregateInputType;
};
export type GetProductCredentialsAggregateType<T extends ProductCredentialsAggregateArgs> = {
    [P in keyof T & keyof AggregateProductCredentials]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateProductCredentials[P]> : Prisma.GetScalarType<T[P], AggregateProductCredentials[P]>;
};
export type ProductCredentialsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductCredentialsWhereInput;
    orderBy?: Prisma.ProductCredentialsOrderByWithAggregationInput | Prisma.ProductCredentialsOrderByWithAggregationInput[];
    by: Prisma.ProductCredentialsScalarFieldEnum[] | Prisma.ProductCredentialsScalarFieldEnum;
    having?: Prisma.ProductCredentialsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProductCredentialsCountAggregateInputType | true;
    _min?: ProductCredentialsMinAggregateInputType;
    _max?: ProductCredentialsMaxAggregateInputType;
};
export type ProductCredentialsGroupByOutputType = {
    id: string;
    productId: string;
    productType: string;
    email: string | null;
    password: string | null;
    licenseKey: string | null;
    accessUrl: string | null;
    downloadUrl: string | null;
    subscriptionStatus: string | null;
    expiresAt: Date | null;
    metadata: string | null;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: ProductCredentialsCountAggregateOutputType | null;
    _min: ProductCredentialsMinAggregateOutputType | null;
    _max: ProductCredentialsMaxAggregateOutputType | null;
};
type GetProductCredentialsGroupByPayload<T extends ProductCredentialsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ProductCredentialsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ProductCredentialsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ProductCredentialsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ProductCredentialsGroupByOutputType[P]>;
}>>;
export type ProductCredentialsWhereInput = {
    AND?: Prisma.ProductCredentialsWhereInput | Prisma.ProductCredentialsWhereInput[];
    OR?: Prisma.ProductCredentialsWhereInput[];
    NOT?: Prisma.ProductCredentialsWhereInput | Prisma.ProductCredentialsWhereInput[];
    id?: Prisma.StringFilter<"ProductCredentials"> | string;
    productId?: Prisma.StringFilter<"ProductCredentials"> | string;
    productType?: Prisma.StringFilter<"ProductCredentials"> | string;
    email?: Prisma.StringNullableFilter<"ProductCredentials"> | string | null;
    password?: Prisma.StringNullableFilter<"ProductCredentials"> | string | null;
    licenseKey?: Prisma.StringNullableFilter<"ProductCredentials"> | string | null;
    accessUrl?: Prisma.StringNullableFilter<"ProductCredentials"> | string | null;
    downloadUrl?: Prisma.StringNullableFilter<"ProductCredentials"> | string | null;
    subscriptionStatus?: Prisma.StringNullableFilter<"ProductCredentials"> | string | null;
    expiresAt?: Prisma.DateTimeNullableFilter<"ProductCredentials"> | Date | string | null;
    metadata?: Prisma.StringNullableFilter<"ProductCredentials"> | string | null;
    notes?: Prisma.StringNullableFilter<"ProductCredentials"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"ProductCredentials"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ProductCredentials"> | Date | string;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
};
export type ProductCredentialsOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    productType?: Prisma.SortOrder;
    email?: Prisma.SortOrderInput | Prisma.SortOrder;
    password?: Prisma.SortOrderInput | Prisma.SortOrder;
    licenseKey?: Prisma.SortOrderInput | Prisma.SortOrder;
    accessUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    downloadUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    subscriptionStatus?: Prisma.SortOrderInput | Prisma.SortOrder;
    expiresAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    metadata?: Prisma.SortOrderInput | Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    product?: Prisma.ProductOrderByWithRelationInput;
};
export type ProductCredentialsWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    productId?: string;
    AND?: Prisma.ProductCredentialsWhereInput | Prisma.ProductCredentialsWhereInput[];
    OR?: Prisma.ProductCredentialsWhereInput[];
    NOT?: Prisma.ProductCredentialsWhereInput | Prisma.ProductCredentialsWhereInput[];
    productType?: Prisma.StringFilter<"ProductCredentials"> | string;
    email?: Prisma.StringNullableFilter<"ProductCredentials"> | string | null;
    password?: Prisma.StringNullableFilter<"ProductCredentials"> | string | null;
    licenseKey?: Prisma.StringNullableFilter<"ProductCredentials"> | string | null;
    accessUrl?: Prisma.StringNullableFilter<"ProductCredentials"> | string | null;
    downloadUrl?: Prisma.StringNullableFilter<"ProductCredentials"> | string | null;
    subscriptionStatus?: Prisma.StringNullableFilter<"ProductCredentials"> | string | null;
    expiresAt?: Prisma.DateTimeNullableFilter<"ProductCredentials"> | Date | string | null;
    metadata?: Prisma.StringNullableFilter<"ProductCredentials"> | string | null;
    notes?: Prisma.StringNullableFilter<"ProductCredentials"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"ProductCredentials"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ProductCredentials"> | Date | string;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
}, "id" | "productId">;
export type ProductCredentialsOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    productType?: Prisma.SortOrder;
    email?: Prisma.SortOrderInput | Prisma.SortOrder;
    password?: Prisma.SortOrderInput | Prisma.SortOrder;
    licenseKey?: Prisma.SortOrderInput | Prisma.SortOrder;
    accessUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    downloadUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    subscriptionStatus?: Prisma.SortOrderInput | Prisma.SortOrder;
    expiresAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    metadata?: Prisma.SortOrderInput | Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.ProductCredentialsCountOrderByAggregateInput;
    _max?: Prisma.ProductCredentialsMaxOrderByAggregateInput;
    _min?: Prisma.ProductCredentialsMinOrderByAggregateInput;
};
export type ProductCredentialsScalarWhereWithAggregatesInput = {
    AND?: Prisma.ProductCredentialsScalarWhereWithAggregatesInput | Prisma.ProductCredentialsScalarWhereWithAggregatesInput[];
    OR?: Prisma.ProductCredentialsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ProductCredentialsScalarWhereWithAggregatesInput | Prisma.ProductCredentialsScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ProductCredentials"> | string;
    productId?: Prisma.StringWithAggregatesFilter<"ProductCredentials"> | string;
    productType?: Prisma.StringWithAggregatesFilter<"ProductCredentials"> | string;
    email?: Prisma.StringNullableWithAggregatesFilter<"ProductCredentials"> | string | null;
    password?: Prisma.StringNullableWithAggregatesFilter<"ProductCredentials"> | string | null;
    licenseKey?: Prisma.StringNullableWithAggregatesFilter<"ProductCredentials"> | string | null;
    accessUrl?: Prisma.StringNullableWithAggregatesFilter<"ProductCredentials"> | string | null;
    downloadUrl?: Prisma.StringNullableWithAggregatesFilter<"ProductCredentials"> | string | null;
    subscriptionStatus?: Prisma.StringNullableWithAggregatesFilter<"ProductCredentials"> | string | null;
    expiresAt?: Prisma.DateTimeNullableWithAggregatesFilter<"ProductCredentials"> | Date | string | null;
    metadata?: Prisma.StringNullableWithAggregatesFilter<"ProductCredentials"> | string | null;
    notes?: Prisma.StringNullableWithAggregatesFilter<"ProductCredentials"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ProductCredentials"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"ProductCredentials"> | Date | string;
};
export type ProductCredentialsCreateInput = {
    id?: string;
    productType: string;
    email?: string | null;
    password?: string | null;
    licenseKey?: string | null;
    accessUrl?: string | null;
    downloadUrl?: string | null;
    subscriptionStatus?: string | null;
    expiresAt?: Date | string | null;
    metadata?: string | null;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    product: Prisma.ProductCreateNestedOneWithoutProductCredentialsInput;
};
export type ProductCredentialsUncheckedCreateInput = {
    id?: string;
    productId: string;
    productType: string;
    email?: string | null;
    password?: string | null;
    licenseKey?: string | null;
    accessUrl?: string | null;
    downloadUrl?: string | null;
    subscriptionStatus?: string | null;
    expiresAt?: Date | string | null;
    metadata?: string | null;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ProductCredentialsUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productType?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    password?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    licenseKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    accessUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    downloadUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    subscriptionStatus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    metadata?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    product?: Prisma.ProductUpdateOneRequiredWithoutProductCredentialsNestedInput;
};
export type ProductCredentialsUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    productType?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    password?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    licenseKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    accessUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    downloadUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    subscriptionStatus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    metadata?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProductCredentialsCreateManyInput = {
    id?: string;
    productId: string;
    productType: string;
    email?: string | null;
    password?: string | null;
    licenseKey?: string | null;
    accessUrl?: string | null;
    downloadUrl?: string | null;
    subscriptionStatus?: string | null;
    expiresAt?: Date | string | null;
    metadata?: string | null;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ProductCredentialsUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productType?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    password?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    licenseKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    accessUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    downloadUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    subscriptionStatus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    metadata?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProductCredentialsUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    productType?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    password?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    licenseKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    accessUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    downloadUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    subscriptionStatus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    metadata?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProductCredentialsNullableScalarRelationFilter = {
    is?: Prisma.ProductCredentialsWhereInput | null;
    isNot?: Prisma.ProductCredentialsWhereInput | null;
};
export type ProductCredentialsCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    productType?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    licenseKey?: Prisma.SortOrder;
    accessUrl?: Prisma.SortOrder;
    downloadUrl?: Prisma.SortOrder;
    subscriptionStatus?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    metadata?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ProductCredentialsMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    productType?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    licenseKey?: Prisma.SortOrder;
    accessUrl?: Prisma.SortOrder;
    downloadUrl?: Prisma.SortOrder;
    subscriptionStatus?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    metadata?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ProductCredentialsMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    productType?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    licenseKey?: Prisma.SortOrder;
    accessUrl?: Prisma.SortOrder;
    downloadUrl?: Prisma.SortOrder;
    subscriptionStatus?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    metadata?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ProductCredentialsCreateNestedOneWithoutProductInput = {
    create?: Prisma.XOR<Prisma.ProductCredentialsCreateWithoutProductInput, Prisma.ProductCredentialsUncheckedCreateWithoutProductInput>;
    connectOrCreate?: Prisma.ProductCredentialsCreateOrConnectWithoutProductInput;
    connect?: Prisma.ProductCredentialsWhereUniqueInput;
};
export type ProductCredentialsUncheckedCreateNestedOneWithoutProductInput = {
    create?: Prisma.XOR<Prisma.ProductCredentialsCreateWithoutProductInput, Prisma.ProductCredentialsUncheckedCreateWithoutProductInput>;
    connectOrCreate?: Prisma.ProductCredentialsCreateOrConnectWithoutProductInput;
    connect?: Prisma.ProductCredentialsWhereUniqueInput;
};
export type ProductCredentialsUpdateOneWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.ProductCredentialsCreateWithoutProductInput, Prisma.ProductCredentialsUncheckedCreateWithoutProductInput>;
    connectOrCreate?: Prisma.ProductCredentialsCreateOrConnectWithoutProductInput;
    upsert?: Prisma.ProductCredentialsUpsertWithoutProductInput;
    disconnect?: Prisma.ProductCredentialsWhereInput | boolean;
    delete?: Prisma.ProductCredentialsWhereInput | boolean;
    connect?: Prisma.ProductCredentialsWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProductCredentialsUpdateToOneWithWhereWithoutProductInput, Prisma.ProductCredentialsUpdateWithoutProductInput>, Prisma.ProductCredentialsUncheckedUpdateWithoutProductInput>;
};
export type ProductCredentialsUncheckedUpdateOneWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.ProductCredentialsCreateWithoutProductInput, Prisma.ProductCredentialsUncheckedCreateWithoutProductInput>;
    connectOrCreate?: Prisma.ProductCredentialsCreateOrConnectWithoutProductInput;
    upsert?: Prisma.ProductCredentialsUpsertWithoutProductInput;
    disconnect?: Prisma.ProductCredentialsWhereInput | boolean;
    delete?: Prisma.ProductCredentialsWhereInput | boolean;
    connect?: Prisma.ProductCredentialsWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProductCredentialsUpdateToOneWithWhereWithoutProductInput, Prisma.ProductCredentialsUpdateWithoutProductInput>, Prisma.ProductCredentialsUncheckedUpdateWithoutProductInput>;
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type ProductCredentialsCreateWithoutProductInput = {
    id?: string;
    productType: string;
    email?: string | null;
    password?: string | null;
    licenseKey?: string | null;
    accessUrl?: string | null;
    downloadUrl?: string | null;
    subscriptionStatus?: string | null;
    expiresAt?: Date | string | null;
    metadata?: string | null;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ProductCredentialsUncheckedCreateWithoutProductInput = {
    id?: string;
    productType: string;
    email?: string | null;
    password?: string | null;
    licenseKey?: string | null;
    accessUrl?: string | null;
    downloadUrl?: string | null;
    subscriptionStatus?: string | null;
    expiresAt?: Date | string | null;
    metadata?: string | null;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ProductCredentialsCreateOrConnectWithoutProductInput = {
    where: Prisma.ProductCredentialsWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductCredentialsCreateWithoutProductInput, Prisma.ProductCredentialsUncheckedCreateWithoutProductInput>;
};
export type ProductCredentialsUpsertWithoutProductInput = {
    update: Prisma.XOR<Prisma.ProductCredentialsUpdateWithoutProductInput, Prisma.ProductCredentialsUncheckedUpdateWithoutProductInput>;
    create: Prisma.XOR<Prisma.ProductCredentialsCreateWithoutProductInput, Prisma.ProductCredentialsUncheckedCreateWithoutProductInput>;
    where?: Prisma.ProductCredentialsWhereInput;
};
export type ProductCredentialsUpdateToOneWithWhereWithoutProductInput = {
    where?: Prisma.ProductCredentialsWhereInput;
    data: Prisma.XOR<Prisma.ProductCredentialsUpdateWithoutProductInput, Prisma.ProductCredentialsUncheckedUpdateWithoutProductInput>;
};
export type ProductCredentialsUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productType?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    password?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    licenseKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    accessUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    downloadUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    subscriptionStatus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    metadata?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProductCredentialsUncheckedUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productType?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    password?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    licenseKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    accessUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    downloadUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    subscriptionStatus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    metadata?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProductCredentialsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    productId?: boolean;
    productType?: boolean;
    email?: boolean;
    password?: boolean;
    licenseKey?: boolean;
    accessUrl?: boolean;
    downloadUrl?: boolean;
    subscriptionStatus?: boolean;
    expiresAt?: boolean;
    metadata?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productCredentials"]>;
export type ProductCredentialsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    productId?: boolean;
    productType?: boolean;
    email?: boolean;
    password?: boolean;
    licenseKey?: boolean;
    accessUrl?: boolean;
    downloadUrl?: boolean;
    subscriptionStatus?: boolean;
    expiresAt?: boolean;
    metadata?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productCredentials"]>;
export type ProductCredentialsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    productId?: boolean;
    productType?: boolean;
    email?: boolean;
    password?: boolean;
    licenseKey?: boolean;
    accessUrl?: boolean;
    downloadUrl?: boolean;
    subscriptionStatus?: boolean;
    expiresAt?: boolean;
    metadata?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productCredentials"]>;
export type ProductCredentialsSelectScalar = {
    id?: boolean;
    productId?: boolean;
    productType?: boolean;
    email?: boolean;
    password?: boolean;
    licenseKey?: boolean;
    accessUrl?: boolean;
    downloadUrl?: boolean;
    subscriptionStatus?: boolean;
    expiresAt?: boolean;
    metadata?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type ProductCredentialsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "productId" | "productType" | "email" | "password" | "licenseKey" | "accessUrl" | "downloadUrl" | "subscriptionStatus" | "expiresAt" | "metadata" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["productCredentials"]>;
export type ProductCredentialsInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
};
export type ProductCredentialsIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
};
export type ProductCredentialsIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
};
export type $ProductCredentialsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ProductCredentials";
    objects: {
        product: Prisma.$ProductPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        productId: string;
        productType: string;
        email: string | null;
        password: string | null;
        licenseKey: string | null;
        accessUrl: string | null;
        downloadUrl: string | null;
        subscriptionStatus: string | null;
        expiresAt: Date | null;
        metadata: string | null;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["productCredentials"]>;
    composites: {};
};
export type ProductCredentialsGetPayload<S extends boolean | null | undefined | ProductCredentialsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ProductCredentialsPayload, S>;
export type ProductCredentialsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ProductCredentialsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ProductCredentialsCountAggregateInputType | true;
};
export interface ProductCredentialsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ProductCredentials'];
        meta: {
            name: 'ProductCredentials';
        };
    };
    /**
     * Find zero or one ProductCredentials that matches the filter.
     * @param {ProductCredentialsFindUniqueArgs} args - Arguments to find a ProductCredentials
     * @example
     * // Get one ProductCredentials
     * const productCredentials = await prisma.productCredentials.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductCredentialsFindUniqueArgs>(args: Prisma.SelectSubset<T, ProductCredentialsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ProductCredentialsClient<runtime.Types.Result.GetResult<Prisma.$ProductCredentialsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one ProductCredentials that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductCredentialsFindUniqueOrThrowArgs} args - Arguments to find a ProductCredentials
     * @example
     * // Get one ProductCredentials
     * const productCredentials = await prisma.productCredentials.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductCredentialsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ProductCredentialsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProductCredentialsClient<runtime.Types.Result.GetResult<Prisma.$ProductCredentialsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first ProductCredentials that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCredentialsFindFirstArgs} args - Arguments to find a ProductCredentials
     * @example
     * // Get one ProductCredentials
     * const productCredentials = await prisma.productCredentials.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductCredentialsFindFirstArgs>(args?: Prisma.SelectSubset<T, ProductCredentialsFindFirstArgs<ExtArgs>>): Prisma.Prisma__ProductCredentialsClient<runtime.Types.Result.GetResult<Prisma.$ProductCredentialsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first ProductCredentials that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCredentialsFindFirstOrThrowArgs} args - Arguments to find a ProductCredentials
     * @example
     * // Get one ProductCredentials
     * const productCredentials = await prisma.productCredentials.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductCredentialsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ProductCredentialsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProductCredentialsClient<runtime.Types.Result.GetResult<Prisma.$ProductCredentialsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more ProductCredentials that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCredentialsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductCredentials
     * const productCredentials = await prisma.productCredentials.findMany()
     *
     * // Get first 10 ProductCredentials
     * const productCredentials = await prisma.productCredentials.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const productCredentialsWithIdOnly = await prisma.productCredentials.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ProductCredentialsFindManyArgs>(args?: Prisma.SelectSubset<T, ProductCredentialsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductCredentialsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a ProductCredentials.
     * @param {ProductCredentialsCreateArgs} args - Arguments to create a ProductCredentials.
     * @example
     * // Create one ProductCredentials
     * const ProductCredentials = await prisma.productCredentials.create({
     *   data: {
     *     // ... data to create a ProductCredentials
     *   }
     * })
     *
     */
    create<T extends ProductCredentialsCreateArgs>(args: Prisma.SelectSubset<T, ProductCredentialsCreateArgs<ExtArgs>>): Prisma.Prisma__ProductCredentialsClient<runtime.Types.Result.GetResult<Prisma.$ProductCredentialsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many ProductCredentials.
     * @param {ProductCredentialsCreateManyArgs} args - Arguments to create many ProductCredentials.
     * @example
     * // Create many ProductCredentials
     * const productCredentials = await prisma.productCredentials.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ProductCredentialsCreateManyArgs>(args?: Prisma.SelectSubset<T, ProductCredentialsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many ProductCredentials and returns the data saved in the database.
     * @param {ProductCredentialsCreateManyAndReturnArgs} args - Arguments to create many ProductCredentials.
     * @example
     * // Create many ProductCredentials
     * const productCredentials = await prisma.productCredentials.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many ProductCredentials and only return the `id`
     * const productCredentialsWithIdOnly = await prisma.productCredentials.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ProductCredentialsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ProductCredentialsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductCredentialsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a ProductCredentials.
     * @param {ProductCredentialsDeleteArgs} args - Arguments to delete one ProductCredentials.
     * @example
     * // Delete one ProductCredentials
     * const ProductCredentials = await prisma.productCredentials.delete({
     *   where: {
     *     // ... filter to delete one ProductCredentials
     *   }
     * })
     *
     */
    delete<T extends ProductCredentialsDeleteArgs>(args: Prisma.SelectSubset<T, ProductCredentialsDeleteArgs<ExtArgs>>): Prisma.Prisma__ProductCredentialsClient<runtime.Types.Result.GetResult<Prisma.$ProductCredentialsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one ProductCredentials.
     * @param {ProductCredentialsUpdateArgs} args - Arguments to update one ProductCredentials.
     * @example
     * // Update one ProductCredentials
     * const productCredentials = await prisma.productCredentials.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ProductCredentialsUpdateArgs>(args: Prisma.SelectSubset<T, ProductCredentialsUpdateArgs<ExtArgs>>): Prisma.Prisma__ProductCredentialsClient<runtime.Types.Result.GetResult<Prisma.$ProductCredentialsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more ProductCredentials.
     * @param {ProductCredentialsDeleteManyArgs} args - Arguments to filter ProductCredentials to delete.
     * @example
     * // Delete a few ProductCredentials
     * const { count } = await prisma.productCredentials.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ProductCredentialsDeleteManyArgs>(args?: Prisma.SelectSubset<T, ProductCredentialsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more ProductCredentials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCredentialsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductCredentials
     * const productCredentials = await prisma.productCredentials.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ProductCredentialsUpdateManyArgs>(args: Prisma.SelectSubset<T, ProductCredentialsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more ProductCredentials and returns the data updated in the database.
     * @param {ProductCredentialsUpdateManyAndReturnArgs} args - Arguments to update many ProductCredentials.
     * @example
     * // Update many ProductCredentials
     * const productCredentials = await prisma.productCredentials.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more ProductCredentials and only return the `id`
     * const productCredentialsWithIdOnly = await prisma.productCredentials.updateManyAndReturn({
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
    updateManyAndReturn<T extends ProductCredentialsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ProductCredentialsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductCredentialsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one ProductCredentials.
     * @param {ProductCredentialsUpsertArgs} args - Arguments to update or create a ProductCredentials.
     * @example
     * // Update or create a ProductCredentials
     * const productCredentials = await prisma.productCredentials.upsert({
     *   create: {
     *     // ... data to create a ProductCredentials
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductCredentials we want to update
     *   }
     * })
     */
    upsert<T extends ProductCredentialsUpsertArgs>(args: Prisma.SelectSubset<T, ProductCredentialsUpsertArgs<ExtArgs>>): Prisma.Prisma__ProductCredentialsClient<runtime.Types.Result.GetResult<Prisma.$ProductCredentialsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of ProductCredentials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCredentialsCountArgs} args - Arguments to filter ProductCredentials to count.
     * @example
     * // Count the number of ProductCredentials
     * const count = await prisma.productCredentials.count({
     *   where: {
     *     // ... the filter for the ProductCredentials we want to count
     *   }
     * })
    **/
    count<T extends ProductCredentialsCountArgs>(args?: Prisma.Subset<T, ProductCredentialsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ProductCredentialsCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a ProductCredentials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCredentialsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProductCredentialsAggregateArgs>(args: Prisma.Subset<T, ProductCredentialsAggregateArgs>): Prisma.PrismaPromise<GetProductCredentialsAggregateType<T>>;
    /**
     * Group by ProductCredentials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCredentialsGroupByArgs} args - Group by arguments.
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
    groupBy<T extends ProductCredentialsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ProductCredentialsGroupByArgs['orderBy'];
    } : {
        orderBy?: ProductCredentialsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ProductCredentialsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductCredentialsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the ProductCredentials model
     */
    readonly fields: ProductCredentialsFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for ProductCredentials.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__ProductCredentialsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    product<T extends Prisma.ProductDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductDefaultArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the ProductCredentials model
 */
export interface ProductCredentialsFieldRefs {
    readonly id: Prisma.FieldRef<"ProductCredentials", 'String'>;
    readonly productId: Prisma.FieldRef<"ProductCredentials", 'String'>;
    readonly productType: Prisma.FieldRef<"ProductCredentials", 'String'>;
    readonly email: Prisma.FieldRef<"ProductCredentials", 'String'>;
    readonly password: Prisma.FieldRef<"ProductCredentials", 'String'>;
    readonly licenseKey: Prisma.FieldRef<"ProductCredentials", 'String'>;
    readonly accessUrl: Prisma.FieldRef<"ProductCredentials", 'String'>;
    readonly downloadUrl: Prisma.FieldRef<"ProductCredentials", 'String'>;
    readonly subscriptionStatus: Prisma.FieldRef<"ProductCredentials", 'String'>;
    readonly expiresAt: Prisma.FieldRef<"ProductCredentials", 'DateTime'>;
    readonly metadata: Prisma.FieldRef<"ProductCredentials", 'String'>;
    readonly notes: Prisma.FieldRef<"ProductCredentials", 'String'>;
    readonly createdAt: Prisma.FieldRef<"ProductCredentials", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"ProductCredentials", 'DateTime'>;
}
/**
 * ProductCredentials findUnique
 */
export type ProductCredentialsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCredentials
     */
    select?: Prisma.ProductCredentialsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductCredentials
     */
    omit?: Prisma.ProductCredentialsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductCredentialsInclude<ExtArgs> | null;
    /**
     * Filter, which ProductCredentials to fetch.
     */
    where: Prisma.ProductCredentialsWhereUniqueInput;
};
/**
 * ProductCredentials findUniqueOrThrow
 */
export type ProductCredentialsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCredentials
     */
    select?: Prisma.ProductCredentialsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductCredentials
     */
    omit?: Prisma.ProductCredentialsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductCredentialsInclude<ExtArgs> | null;
    /**
     * Filter, which ProductCredentials to fetch.
     */
    where: Prisma.ProductCredentialsWhereUniqueInput;
};
/**
 * ProductCredentials findFirst
 */
export type ProductCredentialsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCredentials
     */
    select?: Prisma.ProductCredentialsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductCredentials
     */
    omit?: Prisma.ProductCredentialsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductCredentialsInclude<ExtArgs> | null;
    /**
     * Filter, which ProductCredentials to fetch.
     */
    where?: Prisma.ProductCredentialsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ProductCredentials to fetch.
     */
    orderBy?: Prisma.ProductCredentialsOrderByWithRelationInput | Prisma.ProductCredentialsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ProductCredentials.
     */
    cursor?: Prisma.ProductCredentialsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ProductCredentials from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ProductCredentials.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ProductCredentials.
     */
    distinct?: Prisma.ProductCredentialsScalarFieldEnum | Prisma.ProductCredentialsScalarFieldEnum[];
};
/**
 * ProductCredentials findFirstOrThrow
 */
export type ProductCredentialsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCredentials
     */
    select?: Prisma.ProductCredentialsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductCredentials
     */
    omit?: Prisma.ProductCredentialsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductCredentialsInclude<ExtArgs> | null;
    /**
     * Filter, which ProductCredentials to fetch.
     */
    where?: Prisma.ProductCredentialsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ProductCredentials to fetch.
     */
    orderBy?: Prisma.ProductCredentialsOrderByWithRelationInput | Prisma.ProductCredentialsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ProductCredentials.
     */
    cursor?: Prisma.ProductCredentialsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ProductCredentials from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ProductCredentials.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ProductCredentials.
     */
    distinct?: Prisma.ProductCredentialsScalarFieldEnum | Prisma.ProductCredentialsScalarFieldEnum[];
};
/**
 * ProductCredentials findMany
 */
export type ProductCredentialsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCredentials
     */
    select?: Prisma.ProductCredentialsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductCredentials
     */
    omit?: Prisma.ProductCredentialsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductCredentialsInclude<ExtArgs> | null;
    /**
     * Filter, which ProductCredentials to fetch.
     */
    where?: Prisma.ProductCredentialsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ProductCredentials to fetch.
     */
    orderBy?: Prisma.ProductCredentialsOrderByWithRelationInput | Prisma.ProductCredentialsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing ProductCredentials.
     */
    cursor?: Prisma.ProductCredentialsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ProductCredentials from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ProductCredentials.
     */
    skip?: number;
    distinct?: Prisma.ProductCredentialsScalarFieldEnum | Prisma.ProductCredentialsScalarFieldEnum[];
};
/**
 * ProductCredentials create
 */
export type ProductCredentialsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCredentials
     */
    select?: Prisma.ProductCredentialsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductCredentials
     */
    omit?: Prisma.ProductCredentialsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductCredentialsInclude<ExtArgs> | null;
    /**
     * The data needed to create a ProductCredentials.
     */
    data: Prisma.XOR<Prisma.ProductCredentialsCreateInput, Prisma.ProductCredentialsUncheckedCreateInput>;
};
/**
 * ProductCredentials createMany
 */
export type ProductCredentialsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProductCredentials.
     */
    data: Prisma.ProductCredentialsCreateManyInput | Prisma.ProductCredentialsCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * ProductCredentials createManyAndReturn
 */
export type ProductCredentialsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCredentials
     */
    select?: Prisma.ProductCredentialsSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductCredentials
     */
    omit?: Prisma.ProductCredentialsOmit<ExtArgs> | null;
    /**
     * The data used to create many ProductCredentials.
     */
    data: Prisma.ProductCredentialsCreateManyInput | Prisma.ProductCredentialsCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductCredentialsIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * ProductCredentials update
 */
export type ProductCredentialsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCredentials
     */
    select?: Prisma.ProductCredentialsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductCredentials
     */
    omit?: Prisma.ProductCredentialsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductCredentialsInclude<ExtArgs> | null;
    /**
     * The data needed to update a ProductCredentials.
     */
    data: Prisma.XOR<Prisma.ProductCredentialsUpdateInput, Prisma.ProductCredentialsUncheckedUpdateInput>;
    /**
     * Choose, which ProductCredentials to update.
     */
    where: Prisma.ProductCredentialsWhereUniqueInput;
};
/**
 * ProductCredentials updateMany
 */
export type ProductCredentialsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update ProductCredentials.
     */
    data: Prisma.XOR<Prisma.ProductCredentialsUpdateManyMutationInput, Prisma.ProductCredentialsUncheckedUpdateManyInput>;
    /**
     * Filter which ProductCredentials to update
     */
    where?: Prisma.ProductCredentialsWhereInput;
    /**
     * Limit how many ProductCredentials to update.
     */
    limit?: number;
};
/**
 * ProductCredentials updateManyAndReturn
 */
export type ProductCredentialsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCredentials
     */
    select?: Prisma.ProductCredentialsSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductCredentials
     */
    omit?: Prisma.ProductCredentialsOmit<ExtArgs> | null;
    /**
     * The data used to update ProductCredentials.
     */
    data: Prisma.XOR<Prisma.ProductCredentialsUpdateManyMutationInput, Prisma.ProductCredentialsUncheckedUpdateManyInput>;
    /**
     * Filter which ProductCredentials to update
     */
    where?: Prisma.ProductCredentialsWhereInput;
    /**
     * Limit how many ProductCredentials to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductCredentialsIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * ProductCredentials upsert
 */
export type ProductCredentialsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCredentials
     */
    select?: Prisma.ProductCredentialsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductCredentials
     */
    omit?: Prisma.ProductCredentialsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductCredentialsInclude<ExtArgs> | null;
    /**
     * The filter to search for the ProductCredentials to update in case it exists.
     */
    where: Prisma.ProductCredentialsWhereUniqueInput;
    /**
     * In case the ProductCredentials found by the `where` argument doesn't exist, create a new ProductCredentials with this data.
     */
    create: Prisma.XOR<Prisma.ProductCredentialsCreateInput, Prisma.ProductCredentialsUncheckedCreateInput>;
    /**
     * In case the ProductCredentials was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.ProductCredentialsUpdateInput, Prisma.ProductCredentialsUncheckedUpdateInput>;
};
/**
 * ProductCredentials delete
 */
export type ProductCredentialsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCredentials
     */
    select?: Prisma.ProductCredentialsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductCredentials
     */
    omit?: Prisma.ProductCredentialsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductCredentialsInclude<ExtArgs> | null;
    /**
     * Filter which ProductCredentials to delete.
     */
    where: Prisma.ProductCredentialsWhereUniqueInput;
};
/**
 * ProductCredentials deleteMany
 */
export type ProductCredentialsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which ProductCredentials to delete
     */
    where?: Prisma.ProductCredentialsWhereInput;
    /**
     * Limit how many ProductCredentials to delete.
     */
    limit?: number;
};
/**
 * ProductCredentials without action
 */
export type ProductCredentialsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCredentials
     */
    select?: Prisma.ProductCredentialsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductCredentials
     */
    omit?: Prisma.ProductCredentialsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductCredentialsInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=ProductCredentials.d.ts.map