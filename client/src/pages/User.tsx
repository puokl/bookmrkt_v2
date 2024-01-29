import UserProfile from "../components/UserProfile";
import UserProduct from "../components/UserProduct";

type UserProps = {};

const User: React.FC<UserProps> = () => {
  return (
    <>
      {/* <UserProfile /> */}
      <UserProduct />
    </>
  );
};
export default User;
