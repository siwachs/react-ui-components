import ChipInput from "./components/ChipInput";
import users from "./assets/data/users";

function App(): JSX.Element {
  return <ChipInput items={users} className="p-4" />;
}

export default App;
