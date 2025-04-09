import { profile } from "../constants";

export const Footer = () => {
  return (
    <footer className="text-center text-gray-500 pt-8 pb-4 border-t">
      <p>
        © {new Date().getFullYear()} {profile.name}. All rights reserved.
      </p>
    </footer>
  );
};
