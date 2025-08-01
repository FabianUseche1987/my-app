import Users from "./Users";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <h1 className="text-3xl text-center font-bold py-6">
        Aplicación de facturas
      </h1>

      <Users />
    </div>
  );
}

export default App;
