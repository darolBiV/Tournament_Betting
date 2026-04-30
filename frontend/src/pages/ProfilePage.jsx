import { useEffect, useState } from "react";
import api from "../api/api";

function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/auth/profile");
        setUser(res.data.user);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProfile();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>Profile</h1>
      <p>ID: {user.id}</p>
      <p>Role: {user.role_id}</p>
    </div>
  );
}

export default ProfilePage;