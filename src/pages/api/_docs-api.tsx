import { Accordion } from "flowbite-react";

function ApiDocsPage() {
    return (
        <div>
            <h5 className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-2xl dark:text-white">
                API Tags
            </h5>
            <Accordion collapseAll>
                {/* Panel for Users */}
                <Accordion.Panel>
                    <Accordion.Title>Users</Accordion.Title>
                    <Accordion.Content>
                        <p className="text-gray-500 dark:text-gray-400 mb-2">
                            Explore the user-related API endpoints:
                        </p>
                        <Accordion collapseAll>
                            <Accordion.Panel>
                                <Accordion.Title>Get All Users</Accordion.Title>
                                <Accordion.Content>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        Endpoint: <code>/api/users</code> <br />
                                        Method: <code>GET</code> <br />
                                        Description: Retrieves a list of all users.
                                    </p>
                                </Accordion.Content>
                            </Accordion.Panel>
                            <Accordion.Panel>
                                <Accordion.Title>Create User</Accordion.Title>
                                <Accordion.Content>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        Endpoint: <code>/api/users</code> <br />
                                        Method: <code>POST</code> <br />
                                        Description: Creates a new user.
                                    </p>
                                </Accordion.Content>
                            </Accordion.Panel>
                        </Accordion>
                    </Accordion.Content>
                </Accordion.Panel>

                {/* Panel for Products */}
                <Accordion.Panel>
                    <Accordion.Title>Products</Accordion.Title>
                    <Accordion.Content>
                        <p className="text-gray-500 dark:text-gray-400 mb-2">
                            Example Product API endpoints:
                        </p>
                        <Accordion collapseAll>
                            <Accordion.Panel>
                                <Accordion.Title>getAllCategory</Accordion.Title>
                                <Accordion.Content>
                                    <p className="text-gray-500 dark:text-gray-400 mb-2">
                                        Endpoint: <code>/products/v1/categories/all</code> <br />
                                        Method: <code>GET</code>
                                    </p>
                                    <p className="text-gray-500 dark:text-gray-400">Response:</p>
                                    <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded text-sm text-gray-700 dark:text-gray-300 overflow-auto">
                                        <code>
                                            {`[
    {
        "id": 1,
        "name": "food"
    },
    {
        "id": 2,
        "name": "drinks"
    }
]`}
                                        </code>
                                    </pre>
                                </Accordion.Content>
                            </Accordion.Panel>
                            <Accordion.Panel>
                                <Accordion.Title>addCategory</Accordion.Title>
                                <Accordion.Content>
                                    <p className="text-gray-500 dark:text-gray-400 mb-2">
                                        Endpoint: <code>/products/v1/categories</code> <br />
                                        Method: <code>POST</code>
                                    </p>
                                    <p className="text-gray-500 dark:text-gray-400">Response Body:</p>
                                    <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded text-sm text-gray-700 dark:text-gray-300 overflow-auto">
                                        <code>
                                            {`{
    "name": "food"
}`}
                                        </code>
                                    </pre>
                                    <p className="text-gray-500 dark:text-gray-400">Response:</p>
                                    <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded text-sm text-gray-700 dark:text-gray-300 overflow-auto">
                                        <code>
                                            {`{
    "name": "food",
    "id": 1
}`}
                                        </code>
                                    </pre>
                                </Accordion.Content>
                            </Accordion.Panel>
                            <Accordion.Panel>
                                <Accordion.Title>getProducts</Accordion.Title>
                                <Accordion.Content>
                                    <p className="text-gray-500 dark:text-gray-400 mb-2">
                                        Endpoint: <code>/products/v1</code> <br />
                                        Method: <code>GET</code>
                                    </p>
                                    <p className="text-gray-500 dark:text-gray-400">Response:</p>
                                    <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded text-sm text-gray-700 dark:text-gray-300 overflow-auto">
                                        <code>
                                            {`[
  {
    "id": 1,
    "name": "nasi goreng kampung",
    "description": "nasi goreng kampus khas medan dengan topping telur mata sapi, suwiran ayam, dan memiliki cita rasa pedas khas batak.",
    "price": 1800,
    "sku": "ecom",
    "quantity": 0,
    "category": {
      "id": 1,
      "name": "food"
    }
  }
]`}
                                        </code>
                                    </pre>
                                </Accordion.Content>
                            </Accordion.Panel>
                            <Accordion.Panel>
                                <Accordion.Title>addProduct</Accordion.Title>
                                <Accordion.Content>
                                    <p className="text-gray-500 dark:text-gray-400 mb-2">
                                        Endpoint: <code>/products/v1</code> <br />
                                        Method: <code>POST</code>
                                    </p>
                                    <p className="text-gray-500 dark:text-gray-400">Response Body:</p>
                                    <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded text-sm text-gray-700 dark:text-gray-300 overflow-auto">
                                        <code>
                                            {`{
    "name": "nasi goreng spesial",
    "description": "nasi goreng spesial khas medan dengan bumbu rahasia khas yang memiliki cita rasa batak.",
    "price": 2500,
    "sku": "ecom",
    "quantity": 0,
    "categoryId": 1
}`}
                                        </code>
                                    </pre>
                                    <p className="text-gray-500 dark:text-gray-400">Response:</p>
                                    <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded text-sm text-gray-700 dark:text-gray-300 overflow-auto">
                                        <code>
                                            {`{
  "name": "nasi goreng spesial",
  "description": "nasi goreng spesial khas medan dengan bumbu rahasia khas yang memiliki cita rasa batak.",
  "price": 2500,
  "sku": "ecom",
  "quantity": 0,
  "category": {
    "id": 1,
    "name": "food"
  },
  "id": 2
}`}
                                        </code>
                                    </pre>
                                </Accordion.Content>
                            </Accordion.Panel>
                            <Accordion.Panel>
                                <Accordion.Title>removeProduct</Accordion.Title>
                                <Accordion.Content>
                                    <p className="text-gray-500 dark:text-gray-400 mb-2">
                                        Endpoint: <code>/products/v1</code> <br />
                                        Method: <code>DELETE</code>
                                    </p>
                                    <p className="text-gray-500 dark:text-gray-400">Response:</p>
                                    <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded text-sm text-gray-700 dark:text-gray-300 overflow-auto">
                                        <code>
                                            {`{}`}
                                        </code>
                                    </pre>
                                </Accordion.Content>
                            </Accordion.Panel>
                        </Accordion>
                    </Accordion.Content>
                </Accordion.Panel>
            </Accordion>
        </div>
    );
}

export default ApiDocsPage;
