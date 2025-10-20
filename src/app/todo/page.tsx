"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios"; // for network call API

interface ITodo {
  objectId: string;
  todo: string;
  isDone: boolean;
}
const TodoPage = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const inputTaskRef = useRef<HTMLInputElement>(null);

  // axios promise version
  const onBtCreateTodo = () => {
    axios
      .post("https://zealouscolor-us.backendless.app/api/data/todos", {
        todo: inputTaskRef.current?.value,
        isDone: false,
      })
      .then((response) => {
        // Jika berhasil tambah data, response akan diterima oleh then melalui cbfn
        console.log("RESPONSE API AFTER ADD DATA", response.data);

        alert(`Add task: ${response.data.todo} success`);
      })
      .catch((error) => {
        // Jika gagal tambah data, response akan diterima sebagai error dan masuk kedalam catch
        console.log(error);
      });
  };

  // axios async/await
  const getTodos = async () => {
    try {
      // - get data from backendless table
      const response = await axios.get(
        "https://zealouscolor-us.backendless.app/api/data/todos"
      );
      console.log("RESPONSE FROM DB", response.data);

      // - store data to useState (todos, setTodos)
      setTodos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  const printTodos = () => {
    return todos.map((value: ITodo) => {
      return (
        <li
          key={value.objectId}
          className="flex items-center justify-between py-2 boder-b"
        >
          <div className="flex items-center gap-5">
            <Checkbox
              className="rounded-full w-6 h-6 border-2 border-gray-300"
              checked={value.isDone}
            />
            <span>{value.todo}</span>
          </div>
          <Button type="button" className="p-0 w-8 h-8 rounded-full">
            <Trash />
          </Button>
        </li>
      );
    });
  };

  return (
    <div>
      <div
        className="w-full h-48 bg-cover bg-center relative"
        style={{
          backgroundImage: "url('/light-bg.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500 to-transparent -z-40" />
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 flex justify-between w-[40rem]">
          <h1 className="text-4xl font-bold tracking-widest text-white">
            Todo
          </h1>
          <Button variant="ghost" size="icon" type="button">
            <Moon size={24} />
          </Button>
        </div>
      </div>

      <div className="w-[40rem] m-auto flex flex-col items-center">
        <Card className="w-full mt-[-50px] z-50 bg-white shadow-lg">
          <CardContent>
            <div className="relative">
              <Input
                type="text"
                placeholder="Create a new todo..."
                className="py-6 border-none shadow-none"
                ref={inputTaskRef}
              />
              <Button
                type="button"
                className="absolute top-1/7 right-4"
                onClick={onBtCreateTodo}
              >
                Add Task
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full mt-4 shadow-lg">
          <CardContent className="p-5">
            <ul>{printTodos()}</ul>

            <div className="flex justify-between text-sm text-gray-500 mt-4">
              <span>0 items left</span>
              <div className="space-x-3">
                <Button variant="link" type="button">
                  All
                </Button>
                <Button variant="link" type="button">
                  Done
                </Button>
                <Button variant="link" type="button">
                  Not Yet
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TodoPage;
