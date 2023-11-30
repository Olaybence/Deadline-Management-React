
import { render, screen } from "@testing-library/react";
import AddTask from "../components/AddTask";
import { Provider } from "react-redux";
import store from "../store/storeConfigure";

// describe("Basic date manipulations", () => {
//   test("addDays()", () => {
//     const a = new Date("2023-11-15");
//     const b = addDays(a, 5);
//     // TODO: Check if a === b
//   });
// });


describe("Graphic component test", () => {
    test("addTasks()", () => {
        render(<Provider store={store}>
                <AddTask />
            </Provider>);
        const submit = screen.getByText(/Submit/i);
        expect(submit).toBeInTheDocument();
        
    });

    // test("",()=> {});
    // test("",()=> {});
  });
  
