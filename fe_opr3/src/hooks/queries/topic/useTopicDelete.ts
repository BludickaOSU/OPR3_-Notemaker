import axiosInstance from "../../../api/axiosInstance";
import {queryClient} from "../queryClient";
import {topicQueryKey} from "./useTopic";

const deleteTopic = async (id: number) => {
    try {
        await axiosInstance.delete(`/topics/${id}`);
    } catch (error) {
        console.error('Error topics user:', error);
        throw error;
    }
};

export const useTopicDelete = () => {
    return async (id: number) => {
        await deleteTopic(id);
        await queryClient.invalidateQueries({queryKey: topicQueryKey});
    };
};