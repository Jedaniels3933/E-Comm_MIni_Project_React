Mini-Project: Advanced React E-commerce Web Application
Remember to take your time and work through each question diligently! Test your code, make sure it works, and try to find ways to improve. Once you are happy and satisfied with your code, upload it to Github, then turn in your Github link at the bottom of the page!

Don't forget. Make sure this assignment is in it's own repository. Not mixed in with others!



To successfully build our advanced e-commerce application and achieve the learning objectives, we need to establish clear project requirements. These requirements outline the key features and functionalities that our application must encompass. Below, you'll find a comprehensive list of project requirements based on our learning objectives:

💡 Note:

Either utilize the Ecommerce You built for the last Mini-Project utilizing your Flask API or if you so choose you can use the FaakeStoreAPI endpoint to simulate asynchronous data fetching.  This API, available at https://fakestoreapi.com/, provides a simulated environment for fetching product data, managing user authentication, and simulating CRUD operations on products, carts, and users. By utilizing this mock API, we can demonstrate the capabilities of the advanced topics reviewed within our Module’s Lessons.

Also, while both Context API and Redux Toolkit are valuable tools for state management, we'll focus on Redux for this project to deepen understanding and practice with Redux concepts.

Additionally, we'll encourage the use of React Query for data fetching due to its simplicity and efficiency, while still allowing flexibility for the use of either Context API or Redux Toolkit for state management.

Project Requirements
User CRUD (Utilize React Query) :
Create components for user management functionalities based on the User and Login endpoints of the Fake Store API , including:
Create User: Develop a component to allow users to register by providing necessary information such as username, email, and password, among other data.
Login: Implement a component for user login, where users can enter their credentials (username/email and password) to authenticate. (BONUS) if you want to add functionality to test the password from the login form with the password they created their user account with to add more robust authentication. 
Update User: Develop a component to enable users to update their profile information, such as username, email, and password, among other data.
Delete User: Implement a component for users to delete their accounts, requiring confirmation before permanently removing the account.
Session Storage for Logged In User Data:
Upon successful login, store the user data in session storage. 
Ensure that the user data persists across different components, allowing the user to stay authenticated until they log out or close the tab
Product Catalog:
Home Component and Navigation:
After user login, redirect to the home component of the product catalog.
BONUS Implement navigation features allowing users to browse different sections of the catalog, such as product categories and search functionality.
Product Listing and Display:
Display all available products in the catalog, showing essential details such as title, price, category, description, and image.
(BONUS) Implement sorting functionality to allow users to sort products based on the backend API criteria .
Implement functionality to update the quantity of products in the cart and provide feedback to the user upon successful add
Adding Products to Shopping Cart :
Allow users to add products to their shopping cart directly from the product listing.
Implement functionality to update the quantity of products in the cart and provide feedback to the user upon successful addition.
State Management with Redux Toolkit: 
Utilize Redux Toolkit for managing the shopping cart state, including adding, updating, and removing products from the cart.
Define a slice/reducers/actions to handle cart-related state changes and interactions 
Search Functionality (BONUS):
Implement search functionality allowing users to search for products by title and price.
Category Navigation (BONUS):
Provide navigation options for users to browse products within specific categories.
Fetch all available categories from the backend API and display them as navigation links for users to explore.
Local Storage for Shopping Cart:
Store the shopping cart data in local storage to ensure persistence across different components and browser sessions.
Implement logic to retrieve and update the shopping cart data from local storage, ensuring that the user's cart remains intact even after page refresh or browser closure.
Shopping Cart:
Shopping Cart Component:
Create a Shopping Cart component where users can view and manage the products within their cart.
Display a list of products currently added to the cart, including details such as product title, quantity, and price.
(BONUS) Provide options for users to update the quantity of each product in the cart, allowing them to increase, decrease, or remove items as needed.
Total Amount and Price Calculation:
Calculate and display the total number of products and the total price of the items in the cart.
Update these values dynamically as users modify the contents of their cart, ensuring accuracy and real-time feedback.
Checkout Functionality:
Implement a checkout feature allowing users to complete their purchases.
As there is no backend API for processing orders, simply clear the state management and local storage to simulate the checkout process.
Provide feedback to users upon successful checkout, indicating that their cart has been cleared.
Order History (BONUS):
Allow users to access a list of their previous carts, serving as a history of their orders.
Fetch the list of user carts from the backend API endpoint.
Display each cart entry with details such as the cart ID, date of creation, and the total price of the order.
Enable users to click on individual orders to view the full details, including the list of products and the total price of the order.
Implementing Test-Driven Development (TDD) in React:
API Testing:
Write at least 2 different tests for your app where you Mock an API.
These can be Unit Tests and/or Integration Tests
(BONUS) Cart Integration Testing:
Write a test to check if adding an item to the cart updates the total price.
Simulate user interactions and assert resulting changes using React Testing Library for updating the cart total price.
GitHub Repository:
Create a GitHub repository for the project and commit code regularly.
Maintain a clean and interactive README.md file in the GitHub repository, providing clear instructions on how to run the application and explanations of its features.
Include a link to the GitHub repository in the project documentation.
Submission
Upon completing the project, submit your code and video, including all source code files, and the README.md file in your GitHub repository to your instructor or designated platform.
Project Tips
Modular Architecture:
Design the application with a modular architecture, separating concerns into reusable components for easier maintenance and scalability.
Code Consistency:
Enforce coding standards and conventions across the codebase to maintain consistency and readability.
Utilize linters such as ESLint to identify and fix code style issues automatically.
Error Handling:
Implement robust error handling mechanisms throughout the application to gracefully handle unexpected errors and edge cases.
Provide informative error messages to users for better troubleshooting.
Performance Monitoring:
Monitor application performance using tools like Google Lighthouse or WebPageTest to identify performance bottlenecks and areas for improvement.
Optimize assets, minimize HTTP requests, and utilize caching strategies to improve loading times.
Security Measures:
Apply security best practices such as input validation, output encoding, and parameterized queries to mitigate common security vulnerabilities like XSS and SQL injection.
Utilize HTTPS for secure communication and implement proper authentication and authorization mechanisms to protect sensitive data.
Optimization Techniques:
Employ optimization techniques like code splitting, lazy loading, and tree shaking to reduce bundle size and improve initial load times.
Minify and compress assets, including JavaScript, CSS, and images, to decrease page load times.
Browser Compatibility:
Test the application across different browsers and devices to ensure compatibility and consistent user experience.
Use feature detection and polyfills to handle inconsistencies and provide fallbacks for unsupported features.
Accessibility Guidelines:
Follow accessibility guidelines such as WCAG (Web Content Accessibility Guidelines) to ensure the application is accessible to users with disabilities.
Use semantic HTML, provide descriptive alt text for images, and ensure keyboard navigation and screen reader compatibility.
