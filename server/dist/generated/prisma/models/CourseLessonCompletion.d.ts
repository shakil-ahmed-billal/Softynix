import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model CourseLessonCompletion
 *
 */
export type CourseLessonCompletionModel = runtime.Types.Result.DefaultSelection<Prisma.$CourseLessonCompletionPayload>;
export type AggregateCourseLessonCompletion = {
    _count: CourseLessonCompletionCountAggregateOutputType | null;
    _avg: CourseLessonCompletionAvgAggregateOutputType | null;
    _sum: CourseLessonCompletionSumAggregateOutputType | null;
    _min: CourseLessonCompletionMinAggregateOutputType | null;
    _max: CourseLessonCompletionMaxAggregateOutputType | null;
};
export type CourseLessonCompletionAvgAggregateOutputType = {
    milestoneId: number | null;
    moduleId: number | null;
};
export type CourseLessonCompletionSumAggregateOutputType = {
    milestoneId: number | null;
    moduleId: number | null;
};
export type CourseLessonCompletionMinAggregateOutputType = {
    id: string | null;
    userProductAccessId: string | null;
    courseId: string | null;
    milestoneId: number | null;
    moduleId: number | null;
    completed: boolean | null;
    viewed: boolean | null;
    completedAt: Date | null;
    viewedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CourseLessonCompletionMaxAggregateOutputType = {
    id: string | null;
    userProductAccessId: string | null;
    courseId: string | null;
    milestoneId: number | null;
    moduleId: number | null;
    completed: boolean | null;
    viewed: boolean | null;
    completedAt: Date | null;
    viewedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CourseLessonCompletionCountAggregateOutputType = {
    id: number;
    userProductAccessId: number;
    courseId: number;
    milestoneId: number;
    moduleId: number;
    completed: number;
    viewed: number;
    completedAt: number;
    viewedAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type CourseLessonCompletionAvgAggregateInputType = {
    milestoneId?: true;
    moduleId?: true;
};
export type CourseLessonCompletionSumAggregateInputType = {
    milestoneId?: true;
    moduleId?: true;
};
export type CourseLessonCompletionMinAggregateInputType = {
    id?: true;
    userProductAccessId?: true;
    courseId?: true;
    milestoneId?: true;
    moduleId?: true;
    completed?: true;
    viewed?: true;
    completedAt?: true;
    viewedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CourseLessonCompletionMaxAggregateInputType = {
    id?: true;
    userProductAccessId?: true;
    courseId?: true;
    milestoneId?: true;
    moduleId?: true;
    completed?: true;
    viewed?: true;
    completedAt?: true;
    viewedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CourseLessonCompletionCountAggregateInputType = {
    id?: true;
    userProductAccessId?: true;
    courseId?: true;
    milestoneId?: true;
    moduleId?: true;
    completed?: true;
    viewed?: true;
    completedAt?: true;
    viewedAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type CourseLessonCompletionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which CourseLessonCompletion to aggregate.
     */
    where?: Prisma.CourseLessonCompletionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of CourseLessonCompletions to fetch.
     */
    orderBy?: Prisma.CourseLessonCompletionOrderByWithRelationInput | Prisma.CourseLessonCompletionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.CourseLessonCompletionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` CourseLessonCompletions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` CourseLessonCompletions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned CourseLessonCompletions
    **/
    _count?: true | CourseLessonCompletionCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: CourseLessonCompletionAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: CourseLessonCompletionSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: CourseLessonCompletionMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: CourseLessonCompletionMaxAggregateInputType;
};
export type GetCourseLessonCompletionAggregateType<T extends CourseLessonCompletionAggregateArgs> = {
    [P in keyof T & keyof AggregateCourseLessonCompletion]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCourseLessonCompletion[P]> : Prisma.GetScalarType<T[P], AggregateCourseLessonCompletion[P]>;
};
export type CourseLessonCompletionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CourseLessonCompletionWhereInput;
    orderBy?: Prisma.CourseLessonCompletionOrderByWithAggregationInput | Prisma.CourseLessonCompletionOrderByWithAggregationInput[];
    by: Prisma.CourseLessonCompletionScalarFieldEnum[] | Prisma.CourseLessonCompletionScalarFieldEnum;
    having?: Prisma.CourseLessonCompletionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CourseLessonCompletionCountAggregateInputType | true;
    _avg?: CourseLessonCompletionAvgAggregateInputType;
    _sum?: CourseLessonCompletionSumAggregateInputType;
    _min?: CourseLessonCompletionMinAggregateInputType;
    _max?: CourseLessonCompletionMaxAggregateInputType;
};
export type CourseLessonCompletionGroupByOutputType = {
    id: string;
    userProductAccessId: string;
    courseId: string;
    milestoneId: number;
    moduleId: number;
    completed: boolean;
    viewed: boolean;
    completedAt: Date | null;
    viewedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: CourseLessonCompletionCountAggregateOutputType | null;
    _avg: CourseLessonCompletionAvgAggregateOutputType | null;
    _sum: CourseLessonCompletionSumAggregateOutputType | null;
    _min: CourseLessonCompletionMinAggregateOutputType | null;
    _max: CourseLessonCompletionMaxAggregateOutputType | null;
};
type GetCourseLessonCompletionGroupByPayload<T extends CourseLessonCompletionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CourseLessonCompletionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CourseLessonCompletionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CourseLessonCompletionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CourseLessonCompletionGroupByOutputType[P]>;
}>>;
export type CourseLessonCompletionWhereInput = {
    AND?: Prisma.CourseLessonCompletionWhereInput | Prisma.CourseLessonCompletionWhereInput[];
    OR?: Prisma.CourseLessonCompletionWhereInput[];
    NOT?: Prisma.CourseLessonCompletionWhereInput | Prisma.CourseLessonCompletionWhereInput[];
    id?: Prisma.StringFilter<"CourseLessonCompletion"> | string;
    userProductAccessId?: Prisma.StringFilter<"CourseLessonCompletion"> | string;
    courseId?: Prisma.StringFilter<"CourseLessonCompletion"> | string;
    milestoneId?: Prisma.IntFilter<"CourseLessonCompletion"> | number;
    moduleId?: Prisma.IntFilter<"CourseLessonCompletion"> | number;
    completed?: Prisma.BoolFilter<"CourseLessonCompletion"> | boolean;
    viewed?: Prisma.BoolFilter<"CourseLessonCompletion"> | boolean;
    completedAt?: Prisma.DateTimeNullableFilter<"CourseLessonCompletion"> | Date | string | null;
    viewedAt?: Prisma.DateTimeNullableFilter<"CourseLessonCompletion"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"CourseLessonCompletion"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"CourseLessonCompletion"> | Date | string;
    userProductAccess?: Prisma.XOR<Prisma.UserProductAccessScalarRelationFilter, Prisma.UserProductAccessWhereInput>;
    course?: Prisma.XOR<Prisma.CourseScalarRelationFilter, Prisma.CourseWhereInput>;
};
export type CourseLessonCompletionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userProductAccessId?: Prisma.SortOrder;
    courseId?: Prisma.SortOrder;
    milestoneId?: Prisma.SortOrder;
    moduleId?: Prisma.SortOrder;
    completed?: Prisma.SortOrder;
    viewed?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    viewedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    userProductAccess?: Prisma.UserProductAccessOrderByWithRelationInput;
    course?: Prisma.CourseOrderByWithRelationInput;
};
export type CourseLessonCompletionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userProductAccessId_courseId_milestoneId_moduleId?: Prisma.CourseLessonCompletionUserProductAccessIdCourseIdMilestoneIdModuleIdCompoundUniqueInput;
    AND?: Prisma.CourseLessonCompletionWhereInput | Prisma.CourseLessonCompletionWhereInput[];
    OR?: Prisma.CourseLessonCompletionWhereInput[];
    NOT?: Prisma.CourseLessonCompletionWhereInput | Prisma.CourseLessonCompletionWhereInput[];
    userProductAccessId?: Prisma.StringFilter<"CourseLessonCompletion"> | string;
    courseId?: Prisma.StringFilter<"CourseLessonCompletion"> | string;
    milestoneId?: Prisma.IntFilter<"CourseLessonCompletion"> | number;
    moduleId?: Prisma.IntFilter<"CourseLessonCompletion"> | number;
    completed?: Prisma.BoolFilter<"CourseLessonCompletion"> | boolean;
    viewed?: Prisma.BoolFilter<"CourseLessonCompletion"> | boolean;
    completedAt?: Prisma.DateTimeNullableFilter<"CourseLessonCompletion"> | Date | string | null;
    viewedAt?: Prisma.DateTimeNullableFilter<"CourseLessonCompletion"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"CourseLessonCompletion"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"CourseLessonCompletion"> | Date | string;
    userProductAccess?: Prisma.XOR<Prisma.UserProductAccessScalarRelationFilter, Prisma.UserProductAccessWhereInput>;
    course?: Prisma.XOR<Prisma.CourseScalarRelationFilter, Prisma.CourseWhereInput>;
}, "id" | "userProductAccessId_courseId_milestoneId_moduleId">;
export type CourseLessonCompletionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userProductAccessId?: Prisma.SortOrder;
    courseId?: Prisma.SortOrder;
    milestoneId?: Prisma.SortOrder;
    moduleId?: Prisma.SortOrder;
    completed?: Prisma.SortOrder;
    viewed?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    viewedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.CourseLessonCompletionCountOrderByAggregateInput;
    _avg?: Prisma.CourseLessonCompletionAvgOrderByAggregateInput;
    _max?: Prisma.CourseLessonCompletionMaxOrderByAggregateInput;
    _min?: Prisma.CourseLessonCompletionMinOrderByAggregateInput;
    _sum?: Prisma.CourseLessonCompletionSumOrderByAggregateInput;
};
export type CourseLessonCompletionScalarWhereWithAggregatesInput = {
    AND?: Prisma.CourseLessonCompletionScalarWhereWithAggregatesInput | Prisma.CourseLessonCompletionScalarWhereWithAggregatesInput[];
    OR?: Prisma.CourseLessonCompletionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CourseLessonCompletionScalarWhereWithAggregatesInput | Prisma.CourseLessonCompletionScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"CourseLessonCompletion"> | string;
    userProductAccessId?: Prisma.StringWithAggregatesFilter<"CourseLessonCompletion"> | string;
    courseId?: Prisma.StringWithAggregatesFilter<"CourseLessonCompletion"> | string;
    milestoneId?: Prisma.IntWithAggregatesFilter<"CourseLessonCompletion"> | number;
    moduleId?: Prisma.IntWithAggregatesFilter<"CourseLessonCompletion"> | number;
    completed?: Prisma.BoolWithAggregatesFilter<"CourseLessonCompletion"> | boolean;
    viewed?: Prisma.BoolWithAggregatesFilter<"CourseLessonCompletion"> | boolean;
    completedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"CourseLessonCompletion"> | Date | string | null;
    viewedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"CourseLessonCompletion"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"CourseLessonCompletion"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"CourseLessonCompletion"> | Date | string;
};
export type CourseLessonCompletionCreateInput = {
    id?: string;
    milestoneId: number;
    moduleId: number;
    completed?: boolean;
    viewed?: boolean;
    completedAt?: Date | string | null;
    viewedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    userProductAccess: Prisma.UserProductAccessCreateNestedOneWithoutLessonCompletionsInput;
    course: Prisma.CourseCreateNestedOneWithoutLessonCompletionsInput;
};
export type CourseLessonCompletionUncheckedCreateInput = {
    id?: string;
    userProductAccessId: string;
    courseId: string;
    milestoneId: number;
    moduleId: number;
    completed?: boolean;
    viewed?: boolean;
    completedAt?: Date | string | null;
    viewedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CourseLessonCompletionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    milestoneId?: Prisma.IntFieldUpdateOperationsInput | number;
    moduleId?: Prisma.IntFieldUpdateOperationsInput | number;
    completed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    viewed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    viewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userProductAccess?: Prisma.UserProductAccessUpdateOneRequiredWithoutLessonCompletionsNestedInput;
    course?: Prisma.CourseUpdateOneRequiredWithoutLessonCompletionsNestedInput;
};
export type CourseLessonCompletionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userProductAccessId?: Prisma.StringFieldUpdateOperationsInput | string;
    courseId?: Prisma.StringFieldUpdateOperationsInput | string;
    milestoneId?: Prisma.IntFieldUpdateOperationsInput | number;
    moduleId?: Prisma.IntFieldUpdateOperationsInput | number;
    completed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    viewed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    viewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CourseLessonCompletionCreateManyInput = {
    id?: string;
    userProductAccessId: string;
    courseId: string;
    milestoneId: number;
    moduleId: number;
    completed?: boolean;
    viewed?: boolean;
    completedAt?: Date | string | null;
    viewedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CourseLessonCompletionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    milestoneId?: Prisma.IntFieldUpdateOperationsInput | number;
    moduleId?: Prisma.IntFieldUpdateOperationsInput | number;
    completed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    viewed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    viewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CourseLessonCompletionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userProductAccessId?: Prisma.StringFieldUpdateOperationsInput | string;
    courseId?: Prisma.StringFieldUpdateOperationsInput | string;
    milestoneId?: Prisma.IntFieldUpdateOperationsInput | number;
    moduleId?: Prisma.IntFieldUpdateOperationsInput | number;
    completed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    viewed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    viewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CourseLessonCompletionListRelationFilter = {
    every?: Prisma.CourseLessonCompletionWhereInput;
    some?: Prisma.CourseLessonCompletionWhereInput;
    none?: Prisma.CourseLessonCompletionWhereInput;
};
export type CourseLessonCompletionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type CourseLessonCompletionUserProductAccessIdCourseIdMilestoneIdModuleIdCompoundUniqueInput = {
    userProductAccessId: string;
    courseId: string;
    milestoneId: number;
    moduleId: number;
};
export type CourseLessonCompletionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userProductAccessId?: Prisma.SortOrder;
    courseId?: Prisma.SortOrder;
    milestoneId?: Prisma.SortOrder;
    moduleId?: Prisma.SortOrder;
    completed?: Prisma.SortOrder;
    viewed?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrder;
    viewedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CourseLessonCompletionAvgOrderByAggregateInput = {
    milestoneId?: Prisma.SortOrder;
    moduleId?: Prisma.SortOrder;
};
export type CourseLessonCompletionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userProductAccessId?: Prisma.SortOrder;
    courseId?: Prisma.SortOrder;
    milestoneId?: Prisma.SortOrder;
    moduleId?: Prisma.SortOrder;
    completed?: Prisma.SortOrder;
    viewed?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrder;
    viewedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CourseLessonCompletionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userProductAccessId?: Prisma.SortOrder;
    courseId?: Prisma.SortOrder;
    milestoneId?: Prisma.SortOrder;
    moduleId?: Prisma.SortOrder;
    completed?: Prisma.SortOrder;
    viewed?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrder;
    viewedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CourseLessonCompletionSumOrderByAggregateInput = {
    milestoneId?: Prisma.SortOrder;
    moduleId?: Prisma.SortOrder;
};
export type CourseLessonCompletionCreateNestedManyWithoutUserProductAccessInput = {
    create?: Prisma.XOR<Prisma.CourseLessonCompletionCreateWithoutUserProductAccessInput, Prisma.CourseLessonCompletionUncheckedCreateWithoutUserProductAccessInput> | Prisma.CourseLessonCompletionCreateWithoutUserProductAccessInput[] | Prisma.CourseLessonCompletionUncheckedCreateWithoutUserProductAccessInput[];
    connectOrCreate?: Prisma.CourseLessonCompletionCreateOrConnectWithoutUserProductAccessInput | Prisma.CourseLessonCompletionCreateOrConnectWithoutUserProductAccessInput[];
    createMany?: Prisma.CourseLessonCompletionCreateManyUserProductAccessInputEnvelope;
    connect?: Prisma.CourseLessonCompletionWhereUniqueInput | Prisma.CourseLessonCompletionWhereUniqueInput[];
};
export type CourseLessonCompletionUncheckedCreateNestedManyWithoutUserProductAccessInput = {
    create?: Prisma.XOR<Prisma.CourseLessonCompletionCreateWithoutUserProductAccessInput, Prisma.CourseLessonCompletionUncheckedCreateWithoutUserProductAccessInput> | Prisma.CourseLessonCompletionCreateWithoutUserProductAccessInput[] | Prisma.CourseLessonCompletionUncheckedCreateWithoutUserProductAccessInput[];
    connectOrCreate?: Prisma.CourseLessonCompletionCreateOrConnectWithoutUserProductAccessInput | Prisma.CourseLessonCompletionCreateOrConnectWithoutUserProductAccessInput[];
    createMany?: Prisma.CourseLessonCompletionCreateManyUserProductAccessInputEnvelope;
    connect?: Prisma.CourseLessonCompletionWhereUniqueInput | Prisma.CourseLessonCompletionWhereUniqueInput[];
};
export type CourseLessonCompletionUpdateManyWithoutUserProductAccessNestedInput = {
    create?: Prisma.XOR<Prisma.CourseLessonCompletionCreateWithoutUserProductAccessInput, Prisma.CourseLessonCompletionUncheckedCreateWithoutUserProductAccessInput> | Prisma.CourseLessonCompletionCreateWithoutUserProductAccessInput[] | Prisma.CourseLessonCompletionUncheckedCreateWithoutUserProductAccessInput[];
    connectOrCreate?: Prisma.CourseLessonCompletionCreateOrConnectWithoutUserProductAccessInput | Prisma.CourseLessonCompletionCreateOrConnectWithoutUserProductAccessInput[];
    upsert?: Prisma.CourseLessonCompletionUpsertWithWhereUniqueWithoutUserProductAccessInput | Prisma.CourseLessonCompletionUpsertWithWhereUniqueWithoutUserProductAccessInput[];
    createMany?: Prisma.CourseLessonCompletionCreateManyUserProductAccessInputEnvelope;
    set?: Prisma.CourseLessonCompletionWhereUniqueInput | Prisma.CourseLessonCompletionWhereUniqueInput[];
    disconnect?: Prisma.CourseLessonCompletionWhereUniqueInput | Prisma.CourseLessonCompletionWhereUniqueInput[];
    delete?: Prisma.CourseLessonCompletionWhereUniqueInput | Prisma.CourseLessonCompletionWhereUniqueInput[];
    connect?: Prisma.CourseLessonCompletionWhereUniqueInput | Prisma.CourseLessonCompletionWhereUniqueInput[];
    update?: Prisma.CourseLessonCompletionUpdateWithWhereUniqueWithoutUserProductAccessInput | Prisma.CourseLessonCompletionUpdateWithWhereUniqueWithoutUserProductAccessInput[];
    updateMany?: Prisma.CourseLessonCompletionUpdateManyWithWhereWithoutUserProductAccessInput | Prisma.CourseLessonCompletionUpdateManyWithWhereWithoutUserProductAccessInput[];
    deleteMany?: Prisma.CourseLessonCompletionScalarWhereInput | Prisma.CourseLessonCompletionScalarWhereInput[];
};
export type CourseLessonCompletionUncheckedUpdateManyWithoutUserProductAccessNestedInput = {
    create?: Prisma.XOR<Prisma.CourseLessonCompletionCreateWithoutUserProductAccessInput, Prisma.CourseLessonCompletionUncheckedCreateWithoutUserProductAccessInput> | Prisma.CourseLessonCompletionCreateWithoutUserProductAccessInput[] | Prisma.CourseLessonCompletionUncheckedCreateWithoutUserProductAccessInput[];
    connectOrCreate?: Prisma.CourseLessonCompletionCreateOrConnectWithoutUserProductAccessInput | Prisma.CourseLessonCompletionCreateOrConnectWithoutUserProductAccessInput[];
    upsert?: Prisma.CourseLessonCompletionUpsertWithWhereUniqueWithoutUserProductAccessInput | Prisma.CourseLessonCompletionUpsertWithWhereUniqueWithoutUserProductAccessInput[];
    createMany?: Prisma.CourseLessonCompletionCreateManyUserProductAccessInputEnvelope;
    set?: Prisma.CourseLessonCompletionWhereUniqueInput | Prisma.CourseLessonCompletionWhereUniqueInput[];
    disconnect?: Prisma.CourseLessonCompletionWhereUniqueInput | Prisma.CourseLessonCompletionWhereUniqueInput[];
    delete?: Prisma.CourseLessonCompletionWhereUniqueInput | Prisma.CourseLessonCompletionWhereUniqueInput[];
    connect?: Prisma.CourseLessonCompletionWhereUniqueInput | Prisma.CourseLessonCompletionWhereUniqueInput[];
    update?: Prisma.CourseLessonCompletionUpdateWithWhereUniqueWithoutUserProductAccessInput | Prisma.CourseLessonCompletionUpdateWithWhereUniqueWithoutUserProductAccessInput[];
    updateMany?: Prisma.CourseLessonCompletionUpdateManyWithWhereWithoutUserProductAccessInput | Prisma.CourseLessonCompletionUpdateManyWithWhereWithoutUserProductAccessInput[];
    deleteMany?: Prisma.CourseLessonCompletionScalarWhereInput | Prisma.CourseLessonCompletionScalarWhereInput[];
};
export type CourseLessonCompletionCreateNestedManyWithoutCourseInput = {
    create?: Prisma.XOR<Prisma.CourseLessonCompletionCreateWithoutCourseInput, Prisma.CourseLessonCompletionUncheckedCreateWithoutCourseInput> | Prisma.CourseLessonCompletionCreateWithoutCourseInput[] | Prisma.CourseLessonCompletionUncheckedCreateWithoutCourseInput[];
    connectOrCreate?: Prisma.CourseLessonCompletionCreateOrConnectWithoutCourseInput | Prisma.CourseLessonCompletionCreateOrConnectWithoutCourseInput[];
    createMany?: Prisma.CourseLessonCompletionCreateManyCourseInputEnvelope;
    connect?: Prisma.CourseLessonCompletionWhereUniqueInput | Prisma.CourseLessonCompletionWhereUniqueInput[];
};
export type CourseLessonCompletionUncheckedCreateNestedManyWithoutCourseInput = {
    create?: Prisma.XOR<Prisma.CourseLessonCompletionCreateWithoutCourseInput, Prisma.CourseLessonCompletionUncheckedCreateWithoutCourseInput> | Prisma.CourseLessonCompletionCreateWithoutCourseInput[] | Prisma.CourseLessonCompletionUncheckedCreateWithoutCourseInput[];
    connectOrCreate?: Prisma.CourseLessonCompletionCreateOrConnectWithoutCourseInput | Prisma.CourseLessonCompletionCreateOrConnectWithoutCourseInput[];
    createMany?: Prisma.CourseLessonCompletionCreateManyCourseInputEnvelope;
    connect?: Prisma.CourseLessonCompletionWhereUniqueInput | Prisma.CourseLessonCompletionWhereUniqueInput[];
};
export type CourseLessonCompletionUpdateManyWithoutCourseNestedInput = {
    create?: Prisma.XOR<Prisma.CourseLessonCompletionCreateWithoutCourseInput, Prisma.CourseLessonCompletionUncheckedCreateWithoutCourseInput> | Prisma.CourseLessonCompletionCreateWithoutCourseInput[] | Prisma.CourseLessonCompletionUncheckedCreateWithoutCourseInput[];
    connectOrCreate?: Prisma.CourseLessonCompletionCreateOrConnectWithoutCourseInput | Prisma.CourseLessonCompletionCreateOrConnectWithoutCourseInput[];
    upsert?: Prisma.CourseLessonCompletionUpsertWithWhereUniqueWithoutCourseInput | Prisma.CourseLessonCompletionUpsertWithWhereUniqueWithoutCourseInput[];
    createMany?: Prisma.CourseLessonCompletionCreateManyCourseInputEnvelope;
    set?: Prisma.CourseLessonCompletionWhereUniqueInput | Prisma.CourseLessonCompletionWhereUniqueInput[];
    disconnect?: Prisma.CourseLessonCompletionWhereUniqueInput | Prisma.CourseLessonCompletionWhereUniqueInput[];
    delete?: Prisma.CourseLessonCompletionWhereUniqueInput | Prisma.CourseLessonCompletionWhereUniqueInput[];
    connect?: Prisma.CourseLessonCompletionWhereUniqueInput | Prisma.CourseLessonCompletionWhereUniqueInput[];
    update?: Prisma.CourseLessonCompletionUpdateWithWhereUniqueWithoutCourseInput | Prisma.CourseLessonCompletionUpdateWithWhereUniqueWithoutCourseInput[];
    updateMany?: Prisma.CourseLessonCompletionUpdateManyWithWhereWithoutCourseInput | Prisma.CourseLessonCompletionUpdateManyWithWhereWithoutCourseInput[];
    deleteMany?: Prisma.CourseLessonCompletionScalarWhereInput | Prisma.CourseLessonCompletionScalarWhereInput[];
};
export type CourseLessonCompletionUncheckedUpdateManyWithoutCourseNestedInput = {
    create?: Prisma.XOR<Prisma.CourseLessonCompletionCreateWithoutCourseInput, Prisma.CourseLessonCompletionUncheckedCreateWithoutCourseInput> | Prisma.CourseLessonCompletionCreateWithoutCourseInput[] | Prisma.CourseLessonCompletionUncheckedCreateWithoutCourseInput[];
    connectOrCreate?: Prisma.CourseLessonCompletionCreateOrConnectWithoutCourseInput | Prisma.CourseLessonCompletionCreateOrConnectWithoutCourseInput[];
    upsert?: Prisma.CourseLessonCompletionUpsertWithWhereUniqueWithoutCourseInput | Prisma.CourseLessonCompletionUpsertWithWhereUniqueWithoutCourseInput[];
    createMany?: Prisma.CourseLessonCompletionCreateManyCourseInputEnvelope;
    set?: Prisma.CourseLessonCompletionWhereUniqueInput | Prisma.CourseLessonCompletionWhereUniqueInput[];
    disconnect?: Prisma.CourseLessonCompletionWhereUniqueInput | Prisma.CourseLessonCompletionWhereUniqueInput[];
    delete?: Prisma.CourseLessonCompletionWhereUniqueInput | Prisma.CourseLessonCompletionWhereUniqueInput[];
    connect?: Prisma.CourseLessonCompletionWhereUniqueInput | Prisma.CourseLessonCompletionWhereUniqueInput[];
    update?: Prisma.CourseLessonCompletionUpdateWithWhereUniqueWithoutCourseInput | Prisma.CourseLessonCompletionUpdateWithWhereUniqueWithoutCourseInput[];
    updateMany?: Prisma.CourseLessonCompletionUpdateManyWithWhereWithoutCourseInput | Prisma.CourseLessonCompletionUpdateManyWithWhereWithoutCourseInput[];
    deleteMany?: Prisma.CourseLessonCompletionScalarWhereInput | Prisma.CourseLessonCompletionScalarWhereInput[];
};
export type CourseLessonCompletionCreateWithoutUserProductAccessInput = {
    id?: string;
    milestoneId: number;
    moduleId: number;
    completed?: boolean;
    viewed?: boolean;
    completedAt?: Date | string | null;
    viewedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    course: Prisma.CourseCreateNestedOneWithoutLessonCompletionsInput;
};
export type CourseLessonCompletionUncheckedCreateWithoutUserProductAccessInput = {
    id?: string;
    courseId: string;
    milestoneId: number;
    moduleId: number;
    completed?: boolean;
    viewed?: boolean;
    completedAt?: Date | string | null;
    viewedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CourseLessonCompletionCreateOrConnectWithoutUserProductAccessInput = {
    where: Prisma.CourseLessonCompletionWhereUniqueInput;
    create: Prisma.XOR<Prisma.CourseLessonCompletionCreateWithoutUserProductAccessInput, Prisma.CourseLessonCompletionUncheckedCreateWithoutUserProductAccessInput>;
};
export type CourseLessonCompletionCreateManyUserProductAccessInputEnvelope = {
    data: Prisma.CourseLessonCompletionCreateManyUserProductAccessInput | Prisma.CourseLessonCompletionCreateManyUserProductAccessInput[];
    skipDuplicates?: boolean;
};
export type CourseLessonCompletionUpsertWithWhereUniqueWithoutUserProductAccessInput = {
    where: Prisma.CourseLessonCompletionWhereUniqueInput;
    update: Prisma.XOR<Prisma.CourseLessonCompletionUpdateWithoutUserProductAccessInput, Prisma.CourseLessonCompletionUncheckedUpdateWithoutUserProductAccessInput>;
    create: Prisma.XOR<Prisma.CourseLessonCompletionCreateWithoutUserProductAccessInput, Prisma.CourseLessonCompletionUncheckedCreateWithoutUserProductAccessInput>;
};
export type CourseLessonCompletionUpdateWithWhereUniqueWithoutUserProductAccessInput = {
    where: Prisma.CourseLessonCompletionWhereUniqueInput;
    data: Prisma.XOR<Prisma.CourseLessonCompletionUpdateWithoutUserProductAccessInput, Prisma.CourseLessonCompletionUncheckedUpdateWithoutUserProductAccessInput>;
};
export type CourseLessonCompletionUpdateManyWithWhereWithoutUserProductAccessInput = {
    where: Prisma.CourseLessonCompletionScalarWhereInput;
    data: Prisma.XOR<Prisma.CourseLessonCompletionUpdateManyMutationInput, Prisma.CourseLessonCompletionUncheckedUpdateManyWithoutUserProductAccessInput>;
};
export type CourseLessonCompletionScalarWhereInput = {
    AND?: Prisma.CourseLessonCompletionScalarWhereInput | Prisma.CourseLessonCompletionScalarWhereInput[];
    OR?: Prisma.CourseLessonCompletionScalarWhereInput[];
    NOT?: Prisma.CourseLessonCompletionScalarWhereInput | Prisma.CourseLessonCompletionScalarWhereInput[];
    id?: Prisma.StringFilter<"CourseLessonCompletion"> | string;
    userProductAccessId?: Prisma.StringFilter<"CourseLessonCompletion"> | string;
    courseId?: Prisma.StringFilter<"CourseLessonCompletion"> | string;
    milestoneId?: Prisma.IntFilter<"CourseLessonCompletion"> | number;
    moduleId?: Prisma.IntFilter<"CourseLessonCompletion"> | number;
    completed?: Prisma.BoolFilter<"CourseLessonCompletion"> | boolean;
    viewed?: Prisma.BoolFilter<"CourseLessonCompletion"> | boolean;
    completedAt?: Prisma.DateTimeNullableFilter<"CourseLessonCompletion"> | Date | string | null;
    viewedAt?: Prisma.DateTimeNullableFilter<"CourseLessonCompletion"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"CourseLessonCompletion"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"CourseLessonCompletion"> | Date | string;
};
export type CourseLessonCompletionCreateWithoutCourseInput = {
    id?: string;
    milestoneId: number;
    moduleId: number;
    completed?: boolean;
    viewed?: boolean;
    completedAt?: Date | string | null;
    viewedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    userProductAccess: Prisma.UserProductAccessCreateNestedOneWithoutLessonCompletionsInput;
};
export type CourseLessonCompletionUncheckedCreateWithoutCourseInput = {
    id?: string;
    userProductAccessId: string;
    milestoneId: number;
    moduleId: number;
    completed?: boolean;
    viewed?: boolean;
    completedAt?: Date | string | null;
    viewedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CourseLessonCompletionCreateOrConnectWithoutCourseInput = {
    where: Prisma.CourseLessonCompletionWhereUniqueInput;
    create: Prisma.XOR<Prisma.CourseLessonCompletionCreateWithoutCourseInput, Prisma.CourseLessonCompletionUncheckedCreateWithoutCourseInput>;
};
export type CourseLessonCompletionCreateManyCourseInputEnvelope = {
    data: Prisma.CourseLessonCompletionCreateManyCourseInput | Prisma.CourseLessonCompletionCreateManyCourseInput[];
    skipDuplicates?: boolean;
};
export type CourseLessonCompletionUpsertWithWhereUniqueWithoutCourseInput = {
    where: Prisma.CourseLessonCompletionWhereUniqueInput;
    update: Prisma.XOR<Prisma.CourseLessonCompletionUpdateWithoutCourseInput, Prisma.CourseLessonCompletionUncheckedUpdateWithoutCourseInput>;
    create: Prisma.XOR<Prisma.CourseLessonCompletionCreateWithoutCourseInput, Prisma.CourseLessonCompletionUncheckedCreateWithoutCourseInput>;
};
export type CourseLessonCompletionUpdateWithWhereUniqueWithoutCourseInput = {
    where: Prisma.CourseLessonCompletionWhereUniqueInput;
    data: Prisma.XOR<Prisma.CourseLessonCompletionUpdateWithoutCourseInput, Prisma.CourseLessonCompletionUncheckedUpdateWithoutCourseInput>;
};
export type CourseLessonCompletionUpdateManyWithWhereWithoutCourseInput = {
    where: Prisma.CourseLessonCompletionScalarWhereInput;
    data: Prisma.XOR<Prisma.CourseLessonCompletionUpdateManyMutationInput, Prisma.CourseLessonCompletionUncheckedUpdateManyWithoutCourseInput>;
};
export type CourseLessonCompletionCreateManyUserProductAccessInput = {
    id?: string;
    courseId: string;
    milestoneId: number;
    moduleId: number;
    completed?: boolean;
    viewed?: boolean;
    completedAt?: Date | string | null;
    viewedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CourseLessonCompletionUpdateWithoutUserProductAccessInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    milestoneId?: Prisma.IntFieldUpdateOperationsInput | number;
    moduleId?: Prisma.IntFieldUpdateOperationsInput | number;
    completed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    viewed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    viewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    course?: Prisma.CourseUpdateOneRequiredWithoutLessonCompletionsNestedInput;
};
export type CourseLessonCompletionUncheckedUpdateWithoutUserProductAccessInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    courseId?: Prisma.StringFieldUpdateOperationsInput | string;
    milestoneId?: Prisma.IntFieldUpdateOperationsInput | number;
    moduleId?: Prisma.IntFieldUpdateOperationsInput | number;
    completed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    viewed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    viewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CourseLessonCompletionUncheckedUpdateManyWithoutUserProductAccessInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    courseId?: Prisma.StringFieldUpdateOperationsInput | string;
    milestoneId?: Prisma.IntFieldUpdateOperationsInput | number;
    moduleId?: Prisma.IntFieldUpdateOperationsInput | number;
    completed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    viewed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    viewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CourseLessonCompletionCreateManyCourseInput = {
    id?: string;
    userProductAccessId: string;
    milestoneId: number;
    moduleId: number;
    completed?: boolean;
    viewed?: boolean;
    completedAt?: Date | string | null;
    viewedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CourseLessonCompletionUpdateWithoutCourseInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    milestoneId?: Prisma.IntFieldUpdateOperationsInput | number;
    moduleId?: Prisma.IntFieldUpdateOperationsInput | number;
    completed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    viewed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    viewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userProductAccess?: Prisma.UserProductAccessUpdateOneRequiredWithoutLessonCompletionsNestedInput;
};
export type CourseLessonCompletionUncheckedUpdateWithoutCourseInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userProductAccessId?: Prisma.StringFieldUpdateOperationsInput | string;
    milestoneId?: Prisma.IntFieldUpdateOperationsInput | number;
    moduleId?: Prisma.IntFieldUpdateOperationsInput | number;
    completed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    viewed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    viewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CourseLessonCompletionUncheckedUpdateManyWithoutCourseInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userProductAccessId?: Prisma.StringFieldUpdateOperationsInput | string;
    milestoneId?: Prisma.IntFieldUpdateOperationsInput | number;
    moduleId?: Prisma.IntFieldUpdateOperationsInput | number;
    completed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    viewed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    viewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CourseLessonCompletionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userProductAccessId?: boolean;
    courseId?: boolean;
    milestoneId?: boolean;
    moduleId?: boolean;
    completed?: boolean;
    viewed?: boolean;
    completedAt?: boolean;
    viewedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    userProductAccess?: boolean | Prisma.UserProductAccessDefaultArgs<ExtArgs>;
    course?: boolean | Prisma.CourseDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["courseLessonCompletion"]>;
export type CourseLessonCompletionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userProductAccessId?: boolean;
    courseId?: boolean;
    milestoneId?: boolean;
    moduleId?: boolean;
    completed?: boolean;
    viewed?: boolean;
    completedAt?: boolean;
    viewedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    userProductAccess?: boolean | Prisma.UserProductAccessDefaultArgs<ExtArgs>;
    course?: boolean | Prisma.CourseDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["courseLessonCompletion"]>;
export type CourseLessonCompletionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userProductAccessId?: boolean;
    courseId?: boolean;
    milestoneId?: boolean;
    moduleId?: boolean;
    completed?: boolean;
    viewed?: boolean;
    completedAt?: boolean;
    viewedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    userProductAccess?: boolean | Prisma.UserProductAccessDefaultArgs<ExtArgs>;
    course?: boolean | Prisma.CourseDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["courseLessonCompletion"]>;
export type CourseLessonCompletionSelectScalar = {
    id?: boolean;
    userProductAccessId?: boolean;
    courseId?: boolean;
    milestoneId?: boolean;
    moduleId?: boolean;
    completed?: boolean;
    viewed?: boolean;
    completedAt?: boolean;
    viewedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type CourseLessonCompletionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userProductAccessId" | "courseId" | "milestoneId" | "moduleId" | "completed" | "viewed" | "completedAt" | "viewedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["courseLessonCompletion"]>;
export type CourseLessonCompletionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    userProductAccess?: boolean | Prisma.UserProductAccessDefaultArgs<ExtArgs>;
    course?: boolean | Prisma.CourseDefaultArgs<ExtArgs>;
};
export type CourseLessonCompletionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    userProductAccess?: boolean | Prisma.UserProductAccessDefaultArgs<ExtArgs>;
    course?: boolean | Prisma.CourseDefaultArgs<ExtArgs>;
};
export type CourseLessonCompletionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    userProductAccess?: boolean | Prisma.UserProductAccessDefaultArgs<ExtArgs>;
    course?: boolean | Prisma.CourseDefaultArgs<ExtArgs>;
};
export type $CourseLessonCompletionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "CourseLessonCompletion";
    objects: {
        userProductAccess: Prisma.$UserProductAccessPayload<ExtArgs>;
        course: Prisma.$CoursePayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userProductAccessId: string;
        courseId: string;
        milestoneId: number;
        moduleId: number;
        completed: boolean;
        viewed: boolean;
        completedAt: Date | null;
        viewedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["courseLessonCompletion"]>;
    composites: {};
};
export type CourseLessonCompletionGetPayload<S extends boolean | null | undefined | CourseLessonCompletionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CourseLessonCompletionPayload, S>;
export type CourseLessonCompletionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CourseLessonCompletionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CourseLessonCompletionCountAggregateInputType | true;
};
export interface CourseLessonCompletionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['CourseLessonCompletion'];
        meta: {
            name: 'CourseLessonCompletion';
        };
    };
    /**
     * Find zero or one CourseLessonCompletion that matches the filter.
     * @param {CourseLessonCompletionFindUniqueArgs} args - Arguments to find a CourseLessonCompletion
     * @example
     * // Get one CourseLessonCompletion
     * const courseLessonCompletion = await prisma.courseLessonCompletion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CourseLessonCompletionFindUniqueArgs>(args: Prisma.SelectSubset<T, CourseLessonCompletionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CourseLessonCompletionClient<runtime.Types.Result.GetResult<Prisma.$CourseLessonCompletionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one CourseLessonCompletion that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CourseLessonCompletionFindUniqueOrThrowArgs} args - Arguments to find a CourseLessonCompletion
     * @example
     * // Get one CourseLessonCompletion
     * const courseLessonCompletion = await prisma.courseLessonCompletion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CourseLessonCompletionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CourseLessonCompletionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CourseLessonCompletionClient<runtime.Types.Result.GetResult<Prisma.$CourseLessonCompletionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first CourseLessonCompletion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseLessonCompletionFindFirstArgs} args - Arguments to find a CourseLessonCompletion
     * @example
     * // Get one CourseLessonCompletion
     * const courseLessonCompletion = await prisma.courseLessonCompletion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CourseLessonCompletionFindFirstArgs>(args?: Prisma.SelectSubset<T, CourseLessonCompletionFindFirstArgs<ExtArgs>>): Prisma.Prisma__CourseLessonCompletionClient<runtime.Types.Result.GetResult<Prisma.$CourseLessonCompletionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first CourseLessonCompletion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseLessonCompletionFindFirstOrThrowArgs} args - Arguments to find a CourseLessonCompletion
     * @example
     * // Get one CourseLessonCompletion
     * const courseLessonCompletion = await prisma.courseLessonCompletion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CourseLessonCompletionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CourseLessonCompletionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CourseLessonCompletionClient<runtime.Types.Result.GetResult<Prisma.$CourseLessonCompletionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more CourseLessonCompletions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseLessonCompletionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CourseLessonCompletions
     * const courseLessonCompletions = await prisma.courseLessonCompletion.findMany()
     *
     * // Get first 10 CourseLessonCompletions
     * const courseLessonCompletions = await prisma.courseLessonCompletion.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const courseLessonCompletionWithIdOnly = await prisma.courseLessonCompletion.findMany({ select: { id: true } })
     *
     */
    findMany<T extends CourseLessonCompletionFindManyArgs>(args?: Prisma.SelectSubset<T, CourseLessonCompletionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CourseLessonCompletionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a CourseLessonCompletion.
     * @param {CourseLessonCompletionCreateArgs} args - Arguments to create a CourseLessonCompletion.
     * @example
     * // Create one CourseLessonCompletion
     * const CourseLessonCompletion = await prisma.courseLessonCompletion.create({
     *   data: {
     *     // ... data to create a CourseLessonCompletion
     *   }
     * })
     *
     */
    create<T extends CourseLessonCompletionCreateArgs>(args: Prisma.SelectSubset<T, CourseLessonCompletionCreateArgs<ExtArgs>>): Prisma.Prisma__CourseLessonCompletionClient<runtime.Types.Result.GetResult<Prisma.$CourseLessonCompletionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many CourseLessonCompletions.
     * @param {CourseLessonCompletionCreateManyArgs} args - Arguments to create many CourseLessonCompletions.
     * @example
     * // Create many CourseLessonCompletions
     * const courseLessonCompletion = await prisma.courseLessonCompletion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends CourseLessonCompletionCreateManyArgs>(args?: Prisma.SelectSubset<T, CourseLessonCompletionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many CourseLessonCompletions and returns the data saved in the database.
     * @param {CourseLessonCompletionCreateManyAndReturnArgs} args - Arguments to create many CourseLessonCompletions.
     * @example
     * // Create many CourseLessonCompletions
     * const courseLessonCompletion = await prisma.courseLessonCompletion.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many CourseLessonCompletions and only return the `id`
     * const courseLessonCompletionWithIdOnly = await prisma.courseLessonCompletion.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends CourseLessonCompletionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CourseLessonCompletionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CourseLessonCompletionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a CourseLessonCompletion.
     * @param {CourseLessonCompletionDeleteArgs} args - Arguments to delete one CourseLessonCompletion.
     * @example
     * // Delete one CourseLessonCompletion
     * const CourseLessonCompletion = await prisma.courseLessonCompletion.delete({
     *   where: {
     *     // ... filter to delete one CourseLessonCompletion
     *   }
     * })
     *
     */
    delete<T extends CourseLessonCompletionDeleteArgs>(args: Prisma.SelectSubset<T, CourseLessonCompletionDeleteArgs<ExtArgs>>): Prisma.Prisma__CourseLessonCompletionClient<runtime.Types.Result.GetResult<Prisma.$CourseLessonCompletionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one CourseLessonCompletion.
     * @param {CourseLessonCompletionUpdateArgs} args - Arguments to update one CourseLessonCompletion.
     * @example
     * // Update one CourseLessonCompletion
     * const courseLessonCompletion = await prisma.courseLessonCompletion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends CourseLessonCompletionUpdateArgs>(args: Prisma.SelectSubset<T, CourseLessonCompletionUpdateArgs<ExtArgs>>): Prisma.Prisma__CourseLessonCompletionClient<runtime.Types.Result.GetResult<Prisma.$CourseLessonCompletionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more CourseLessonCompletions.
     * @param {CourseLessonCompletionDeleteManyArgs} args - Arguments to filter CourseLessonCompletions to delete.
     * @example
     * // Delete a few CourseLessonCompletions
     * const { count } = await prisma.courseLessonCompletion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends CourseLessonCompletionDeleteManyArgs>(args?: Prisma.SelectSubset<T, CourseLessonCompletionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more CourseLessonCompletions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseLessonCompletionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CourseLessonCompletions
     * const courseLessonCompletion = await prisma.courseLessonCompletion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends CourseLessonCompletionUpdateManyArgs>(args: Prisma.SelectSubset<T, CourseLessonCompletionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more CourseLessonCompletions and returns the data updated in the database.
     * @param {CourseLessonCompletionUpdateManyAndReturnArgs} args - Arguments to update many CourseLessonCompletions.
     * @example
     * // Update many CourseLessonCompletions
     * const courseLessonCompletion = await prisma.courseLessonCompletion.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more CourseLessonCompletions and only return the `id`
     * const courseLessonCompletionWithIdOnly = await prisma.courseLessonCompletion.updateManyAndReturn({
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
    updateManyAndReturn<T extends CourseLessonCompletionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CourseLessonCompletionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CourseLessonCompletionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one CourseLessonCompletion.
     * @param {CourseLessonCompletionUpsertArgs} args - Arguments to update or create a CourseLessonCompletion.
     * @example
     * // Update or create a CourseLessonCompletion
     * const courseLessonCompletion = await prisma.courseLessonCompletion.upsert({
     *   create: {
     *     // ... data to create a CourseLessonCompletion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CourseLessonCompletion we want to update
     *   }
     * })
     */
    upsert<T extends CourseLessonCompletionUpsertArgs>(args: Prisma.SelectSubset<T, CourseLessonCompletionUpsertArgs<ExtArgs>>): Prisma.Prisma__CourseLessonCompletionClient<runtime.Types.Result.GetResult<Prisma.$CourseLessonCompletionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of CourseLessonCompletions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseLessonCompletionCountArgs} args - Arguments to filter CourseLessonCompletions to count.
     * @example
     * // Count the number of CourseLessonCompletions
     * const count = await prisma.courseLessonCompletion.count({
     *   where: {
     *     // ... the filter for the CourseLessonCompletions we want to count
     *   }
     * })
    **/
    count<T extends CourseLessonCompletionCountArgs>(args?: Prisma.Subset<T, CourseLessonCompletionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CourseLessonCompletionCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a CourseLessonCompletion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseLessonCompletionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CourseLessonCompletionAggregateArgs>(args: Prisma.Subset<T, CourseLessonCompletionAggregateArgs>): Prisma.PrismaPromise<GetCourseLessonCompletionAggregateType<T>>;
    /**
     * Group by CourseLessonCompletion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseLessonCompletionGroupByArgs} args - Group by arguments.
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
    groupBy<T extends CourseLessonCompletionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CourseLessonCompletionGroupByArgs['orderBy'];
    } : {
        orderBy?: CourseLessonCompletionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CourseLessonCompletionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCourseLessonCompletionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the CourseLessonCompletion model
     */
    readonly fields: CourseLessonCompletionFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for CourseLessonCompletion.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__CourseLessonCompletionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    userProductAccess<T extends Prisma.UserProductAccessDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserProductAccessDefaultArgs<ExtArgs>>): Prisma.Prisma__UserProductAccessClient<runtime.Types.Result.GetResult<Prisma.$UserProductAccessPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    course<T extends Prisma.CourseDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CourseDefaultArgs<ExtArgs>>): Prisma.Prisma__CourseClient<runtime.Types.Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the CourseLessonCompletion model
 */
export interface CourseLessonCompletionFieldRefs {
    readonly id: Prisma.FieldRef<"CourseLessonCompletion", 'String'>;
    readonly userProductAccessId: Prisma.FieldRef<"CourseLessonCompletion", 'String'>;
    readonly courseId: Prisma.FieldRef<"CourseLessonCompletion", 'String'>;
    readonly milestoneId: Prisma.FieldRef<"CourseLessonCompletion", 'Int'>;
    readonly moduleId: Prisma.FieldRef<"CourseLessonCompletion", 'Int'>;
    readonly completed: Prisma.FieldRef<"CourseLessonCompletion", 'Boolean'>;
    readonly viewed: Prisma.FieldRef<"CourseLessonCompletion", 'Boolean'>;
    readonly completedAt: Prisma.FieldRef<"CourseLessonCompletion", 'DateTime'>;
    readonly viewedAt: Prisma.FieldRef<"CourseLessonCompletion", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"CourseLessonCompletion", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"CourseLessonCompletion", 'DateTime'>;
}
/**
 * CourseLessonCompletion findUnique
 */
export type CourseLessonCompletionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which CourseLessonCompletion to fetch.
     */
    where: Prisma.CourseLessonCompletionWhereUniqueInput;
};
/**
 * CourseLessonCompletion findUniqueOrThrow
 */
export type CourseLessonCompletionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which CourseLessonCompletion to fetch.
     */
    where: Prisma.CourseLessonCompletionWhereUniqueInput;
};
/**
 * CourseLessonCompletion findFirst
 */
export type CourseLessonCompletionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which CourseLessonCompletion to fetch.
     */
    where?: Prisma.CourseLessonCompletionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of CourseLessonCompletions to fetch.
     */
    orderBy?: Prisma.CourseLessonCompletionOrderByWithRelationInput | Prisma.CourseLessonCompletionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for CourseLessonCompletions.
     */
    cursor?: Prisma.CourseLessonCompletionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` CourseLessonCompletions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` CourseLessonCompletions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of CourseLessonCompletions.
     */
    distinct?: Prisma.CourseLessonCompletionScalarFieldEnum | Prisma.CourseLessonCompletionScalarFieldEnum[];
};
/**
 * CourseLessonCompletion findFirstOrThrow
 */
export type CourseLessonCompletionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which CourseLessonCompletion to fetch.
     */
    where?: Prisma.CourseLessonCompletionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of CourseLessonCompletions to fetch.
     */
    orderBy?: Prisma.CourseLessonCompletionOrderByWithRelationInput | Prisma.CourseLessonCompletionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for CourseLessonCompletions.
     */
    cursor?: Prisma.CourseLessonCompletionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` CourseLessonCompletions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` CourseLessonCompletions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of CourseLessonCompletions.
     */
    distinct?: Prisma.CourseLessonCompletionScalarFieldEnum | Prisma.CourseLessonCompletionScalarFieldEnum[];
};
/**
 * CourseLessonCompletion findMany
 */
export type CourseLessonCompletionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which CourseLessonCompletions to fetch.
     */
    where?: Prisma.CourseLessonCompletionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of CourseLessonCompletions to fetch.
     */
    orderBy?: Prisma.CourseLessonCompletionOrderByWithRelationInput | Prisma.CourseLessonCompletionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing CourseLessonCompletions.
     */
    cursor?: Prisma.CourseLessonCompletionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` CourseLessonCompletions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` CourseLessonCompletions.
     */
    skip?: number;
    distinct?: Prisma.CourseLessonCompletionScalarFieldEnum | Prisma.CourseLessonCompletionScalarFieldEnum[];
};
/**
 * CourseLessonCompletion create
 */
export type CourseLessonCompletionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a CourseLessonCompletion.
     */
    data: Prisma.XOR<Prisma.CourseLessonCompletionCreateInput, Prisma.CourseLessonCompletionUncheckedCreateInput>;
};
/**
 * CourseLessonCompletion createMany
 */
export type CourseLessonCompletionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many CourseLessonCompletions.
     */
    data: Prisma.CourseLessonCompletionCreateManyInput | Prisma.CourseLessonCompletionCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * CourseLessonCompletion createManyAndReturn
 */
export type CourseLessonCompletionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseLessonCompletion
     */
    select?: Prisma.CourseLessonCompletionSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the CourseLessonCompletion
     */
    omit?: Prisma.CourseLessonCompletionOmit<ExtArgs> | null;
    /**
     * The data used to create many CourseLessonCompletions.
     */
    data: Prisma.CourseLessonCompletionCreateManyInput | Prisma.CourseLessonCompletionCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CourseLessonCompletionIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * CourseLessonCompletion update
 */
export type CourseLessonCompletionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a CourseLessonCompletion.
     */
    data: Prisma.XOR<Prisma.CourseLessonCompletionUpdateInput, Prisma.CourseLessonCompletionUncheckedUpdateInput>;
    /**
     * Choose, which CourseLessonCompletion to update.
     */
    where: Prisma.CourseLessonCompletionWhereUniqueInput;
};
/**
 * CourseLessonCompletion updateMany
 */
export type CourseLessonCompletionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update CourseLessonCompletions.
     */
    data: Prisma.XOR<Prisma.CourseLessonCompletionUpdateManyMutationInput, Prisma.CourseLessonCompletionUncheckedUpdateManyInput>;
    /**
     * Filter which CourseLessonCompletions to update
     */
    where?: Prisma.CourseLessonCompletionWhereInput;
    /**
     * Limit how many CourseLessonCompletions to update.
     */
    limit?: number;
};
/**
 * CourseLessonCompletion updateManyAndReturn
 */
export type CourseLessonCompletionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseLessonCompletion
     */
    select?: Prisma.CourseLessonCompletionSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the CourseLessonCompletion
     */
    omit?: Prisma.CourseLessonCompletionOmit<ExtArgs> | null;
    /**
     * The data used to update CourseLessonCompletions.
     */
    data: Prisma.XOR<Prisma.CourseLessonCompletionUpdateManyMutationInput, Prisma.CourseLessonCompletionUncheckedUpdateManyInput>;
    /**
     * Filter which CourseLessonCompletions to update
     */
    where?: Prisma.CourseLessonCompletionWhereInput;
    /**
     * Limit how many CourseLessonCompletions to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CourseLessonCompletionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * CourseLessonCompletion upsert
 */
export type CourseLessonCompletionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the CourseLessonCompletion to update in case it exists.
     */
    where: Prisma.CourseLessonCompletionWhereUniqueInput;
    /**
     * In case the CourseLessonCompletion found by the `where` argument doesn't exist, create a new CourseLessonCompletion with this data.
     */
    create: Prisma.XOR<Prisma.CourseLessonCompletionCreateInput, Prisma.CourseLessonCompletionUncheckedCreateInput>;
    /**
     * In case the CourseLessonCompletion was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.CourseLessonCompletionUpdateInput, Prisma.CourseLessonCompletionUncheckedUpdateInput>;
};
/**
 * CourseLessonCompletion delete
 */
export type CourseLessonCompletionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which CourseLessonCompletion to delete.
     */
    where: Prisma.CourseLessonCompletionWhereUniqueInput;
};
/**
 * CourseLessonCompletion deleteMany
 */
export type CourseLessonCompletionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which CourseLessonCompletions to delete
     */
    where?: Prisma.CourseLessonCompletionWhereInput;
    /**
     * Limit how many CourseLessonCompletions to delete.
     */
    limit?: number;
};
/**
 * CourseLessonCompletion without action
 */
export type CourseLessonCompletionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
export {};
//# sourceMappingURL=CourseLessonCompletion.d.ts.map