import { useAuth } from "../../contexts/authContext/authHook";

const HomePage = () => {
  const { userRole, userName } = useAuth();

  return (
    <div>
      Homepage
      {userRole} {userName}
    </div>
  );
};

export default HomePage;
