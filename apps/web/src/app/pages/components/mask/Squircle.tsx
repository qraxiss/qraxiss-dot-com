import { Avatar } from "@/components/ui";

const Squircle = () => {
  return (
    <Avatar
      size={24}
      src="/web/images/avatar/avatar-5.jpg"
      classNames={{ display: "mask is-squircle rounded-none" }}
    />
  );
};

export { Squircle };
