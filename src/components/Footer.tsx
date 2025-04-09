import { profile } from "../constants";

export const Footer = () => {
  return (
    <footer className="text-center text-indigo-300 pt-12 pb-2">
      <p>
        © {new Date().getFullYear()} {profile.name}. All rights reserved.
      </p>
    </footer>
  );
};
