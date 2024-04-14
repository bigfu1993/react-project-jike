
import { Button } from 'antd';
import { useSelector } from 'react-redux'

function App() {
  const user = useSelector(state => state.user)
  return (
    <div className="App">
      app : { user }
      <Button type="primary">Button</Button>
    </div>
  );
}

export default App;
