import React from "react";
import { useGetTasks } from "../../api-hooks/task/task.query";
import { GetTasksRequest } from "../../api-hooks/task/task.model";
import {
  ActionIcon,
  Checkbox,
  ComboboxData,
  Flex,
  Select,
  Skeleton,
  Text,
} from "@mantine/core";
import { Plus } from "@phosphor-icons/react";
import TaskModal, { TaskModalRef } from "./modal";
import ProfileAction from "../profile/action";
import ProfileLogout from "../profile/logout";
import TaskItem from "./item";
import { useSearchParams } from "react-router-dom";

const sortOptions: ComboboxData = [
  {
    value: "id%20ASC",
    label: "ID Ascending",
  },
  {
    value: "id%20DESC",
    label: "ID Descending",
  },
  {
    value: "is_complete%20ASC",
    label: "Completed Ascending",
  },
  {
    value: "is_complete%20DESC",
    label: "Completed",
  },
];

export default function TaskList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get("sort");
  const is_complete = searchParams.get("is_complete");
  const [params, setParams] = React.useState<GetTasksRequest | undefined>({
    sort: undefined,
    is_complete: undefined,
  });
  const { data, isFetching, error, status } = useGetTasks(params);
  const tasks = data?.data?.data || [];
  const taskModalRef = React.useRef<TaskModalRef>(null);

  const firstTime = React.useRef(false);

  React.useEffect(() => {
    if (firstTime.current) return;
    const params = {} as Partial<GetTasksRequest>;
    if (typeof sort === "string") {
      params.sort = sort as GetTasksRequest["sort"];
    }
    if (typeof is_complete === "string" && is_complete === "true") {
      params.is_complete = true;
    }
    setParams(params);
    firstTime.current = true;
  }, [sort, is_complete, setParams]);

  return (
    <div
      style={{
        minHeight: "100dvh",
        minWidth: "100dvw",
      }}
    >
      <Flex
        maw={768}
        p={16}
        m="auto"
        pos="sticky"
        bg="white"
        top={0}
        direction="column"
        gap={32}
        style={{
          zIndex: 3,
        }}
      >
        <Text ta="center" style={{ zIndex: 3 }} fz={24} fw={600}>
          Task List
        </Text>
        <Flex
          direction="row"
          gap={16}
          justify="space-between"
          align="center"
          m="auto"
        >
          <Checkbox
            label="Completed Task"
            checked={!!params?.is_complete}
            onChange={(e) => {
              const is_complete = e.currentTarget.checked || undefined;
              setParams({
                ...params,
                is_complete,
              });
              const _params = {} as Partial<GetTasksRequest>;
              if (is_complete) {
                _params.is_complete = is_complete;
              }
              if (params?.sort) {
                _params.sort = params.sort;
              }
              setSearchParams(_params as any);
            }}
          />
          <Select
            placeholder="Sort"
            value={params?.sort}
            data={sortOptions}
            onChange={(val) => {
              const value = (val || undefined) as GetTasksRequest["sort"];
              setParams({
                ...params,
                sort: value,
              });
              const _params = {} as Partial<GetTasksRequest>;
              if (params?.is_complete) {
                _params.is_complete = params.is_complete;
              }
              if (value) {
                _params.sort = value;
              }
              setSearchParams(_params as any);
            }}
            clearable
          />
        </Flex>
        {isFetching && (
          <Flex flex={1} direction="column" gap={16}>
            <Skeleton height={64} w="100%" />
            <Skeleton height={64} w="100%" />
            <Skeleton height={64} w="100%" />
            <Skeleton height={64} w="100%" />
          </Flex>
        )}
        {error && <Text color="red">Error: {error.message}</Text>}
        <Flex
          style={{
            zIndex: 8,
          }}
          pos="absolute"
          top={16}
          right={16}
          direction="row"
          gap={16}
        >
          <ProfileAction />
          <ProfileLogout />
        </Flex>
      </Flex>

      {status === "success" && tasks.length === 0 && (
        <Text ta='center' fw={600}
        fz={16}>No tasks found</Text>
      )}
      <Flex mb={64} direction="column" gap={16} m="auto" p={16} maw={768}>
        {tasks.map((task) => {
          return (
            <TaskItem task={task} taskModalRef={taskModalRef} key={task.id} />
          );
        })}
      </Flex>

      <ActionIcon
        pos="fixed"
        style={{
          zIndex: 10,
        }}
        bottom={16}
        right={16}
        radius={999}
        size={36}
        onClick={() => {
          taskModalRef.current?.setIsOpen(true);
          taskModalRef.current?.setTask(null);
        }}
      >
        <Plus size={24} />
      </ActionIcon>
      <TaskModal ref={taskModalRef} />
    </div>
  );
}
