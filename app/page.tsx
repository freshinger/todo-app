'use client';

import { FC, useEffect } from "react";
import MainContainer from "@/components/Navigation/MainContainer";
import { Spinner, Box, Heading } from "@chakra-ui/react";
import Layout from "@/components/Layout/Layout";
import TaskList from "@/components/TaskList/TaskList";
import useSWR from "swr";
import { useTaskStore } from "@/store";
import AddTaskInput from "@/components/Task/AddTaskInput";
import SetupModal from "@/components/Modal/Modal";

const IndexPage: FC = () => {
  const { data: tasks, isLoading, error } = useSWR<Task[], Error>("/api/tasks");

  const setActiveList = useTaskStore((state: unknown) => (state as TaskStore).setActiveList);
  const setCountingTasks = useTaskStore((state: unknown) => (state as TaskStore).setCountingTasks);

  useEffect(() => {
    setActiveList("TaskTango - Home Page");
    tasks && setCountingTasks(tasks);
  });

  if (!tasks) {
    return null;
  }

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        position="absolute"
      >
        <Heading size="xl">Loading...</Heading>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="teal.400"
          size="xl"
        />
      </Box>
    );
  }

  if (error) {
    return <div>failed to load</div>;
  }

  return (
    <Layout title="TaskTango - Home Page">
      <MainContainer mainTitle="All Tasks">
        <SetupModal />
        <AddTaskInput />
        <TaskList tasks={tasks} />
      </MainContainer>
    </Layout>
  );
};

export default IndexPage;