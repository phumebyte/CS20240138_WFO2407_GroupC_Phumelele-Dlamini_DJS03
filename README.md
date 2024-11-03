# DJS03 Project Brief: Book Connect - Abstractions

Dive into the delightful world of "Book Connect," where literary adventures await at your fingertips! Browse, explore, and uncover your next great read from a vast, vibrant collection. Whether you're a fan of thrilling mysteries, epic fantasies, or heartwarming romances, "Book Connect" brings the magic of books directly to you. Happy reading! 

The "Book Connect" project provides an opportunity for students to refine a fully functional version of an application. The focus of this project is to enhance the code's maintainability, extendibility, and readability by applying concepts of objects and functions for abstraction. This will not only streamline future modifications but also consolidate students' understanding of higher-level programming concepts, including documentation, Styleguides, and abstraction principles.

![alt text](image.png)

#### Discussion and Reflection

Discussion : 

#### Refactoring decisions made 
- I used seperate files (script.js and tasks.js) that seperate general functionality and the repetitive tasks. The division means that each file has a clear responsibility. This enhances modularity because all the repetitive tasks can be applied to file containing main application logic.
- In tasks.js, I used reusable functions, which enhances modularity and and code reusability.
   - **createBookElement** - This function abstracts the creation of individual book elements into a single, reusable unit. It accepts a book object and returns a button element representing the book. Any part of the app can call this function to create book elements without duplicating code for setting up HTML structure, classes, or content.
   - **renderBookList** - This function renders a list of books by calling createBookElement for each book in the provided list. This function abstracts the task of adding multiple book elements to the DOM, making it easy to render different sets of books based on filters or pagination.
   - **createOptionElements** - This function generates a dropdown menu for genres or authors by creating <option> elements based on input data. Instead of writing dropdown code repeatedly, this function builds it dynamically, making it highly reusable.
   - **toggleTheme** - This function handles theme changes in a modular way, applying specific color schemes based on the theme passed as a parameter. The function's encapsulation allows theme-switching logic to be centrally managed and easily updated.
- In script.js, I grouped the event listeners into modular functions
- Filtering in the Search function applied abstraction by filtering through the books array based on multiple conditions instead of one. The handleSearch() function reduces code duplication by applying multiple filters based on form input.

#### How abstraction and applied changes improve the codebase
1. Reusable functions and components make it easier to make changes to modular components rather than refactor everywhere that changes exist. This also reduces redundancy, and makes the code more maintainable.
2. Debugging will be much easier because each function performs a well defined task, should there be a problem with a specific task, we know that it arises from the task function
3. The codebase is more extendable because each component is modular and adding new features is more straighforward. If a new theme option needs to be added, its simpler to extend toggleTheme function with an additional case rather than change the rest of the codebase.

#### Impact of documentation
In this code, documentation helps me understand each function's purpose, inputs, and outputs quickly, making it easier to work on or update specific parts without diving into the details. It clarifies expected behavior, which is useful for debugging, and reducing mistakes. By documenting functions like createBookElement and renderBookList, I know what each one does and how to use it, supporting collaboration and preventing code duplication. The comments make the code more readable and maintainable, and they encourage consistent practices, helping me and others scale and improve the code over time.

#### Challenges

Planning out a refactoring process proved challenging as I did not want to make irreperable changes to the codebase. It was easier to figure out which parts of the code were repetitive and needed modularity and abstraction, however applying the logic was a challenge. 
