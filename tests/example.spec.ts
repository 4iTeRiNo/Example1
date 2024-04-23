import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173/");
});

const TODO_ITEMS = ["Тестовое задание", "Прекрасный код", "Покрытие тестами"];
// const hello = "hello";

test.describe("New Todo", () => {
  test("should allow me to add todo items", async ({ page }) => {
    const newTodo = page.getByPlaceholder("Add Todo");
    const addTodo = page.getByRole("button").getByText("Add Task");

    await newTodo.fill(TODO_ITEMS[0]);
    await addTodo.click();

    await expect(page.getByTestId("text-title")).toHaveText([TODO_ITEMS[0]]);

    await newTodo.fill(TODO_ITEMS[1]);
    await addTodo.click();

    await expect(page.getByTestId("text-title")).toHaveText([
      TODO_ITEMS[0],
      TODO_ITEMS[1],
    ]);
  });
});

test.describe("Item", () => {
  test("should allow me to mark items as complete", async ({ page }) => {
    const firstTodo = page.getByTestId("checkbox").nth(0);
    const secondTodo = page.getByTestId("checkbox").nth(1);

    await firstTodo.dispatchEvent("click");
    await secondTodo.dispatchEvent("click");

    await expect(firstTodo).toBeChecked();
    await expect(secondTodo).toBeChecked();

    await firstTodo.dispatchEvent("click");
    await secondTodo.dispatchEvent("click");

    await expect(firstTodo).not.toBeChecked();
    await expect(secondTodo).not.toBeChecked();
  });
});

test.describe("Delete Todo", () => {
  test("the element should be deleted", async ({ page }) => {
    page.getByTestId("task-todos").nth(0);
    await page.getByTestId("delete").nth(0).dispatchEvent("click");
    await page.getByTestId("delete").nth(0).dispatchEvent("click");

    expect(page.getByPlaceholder("What needs to be done?"));
  });
});
