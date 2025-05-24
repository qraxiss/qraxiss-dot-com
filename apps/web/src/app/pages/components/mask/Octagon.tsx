import { Avatar } from "@/components/ui";

const Octagon = () => {
  return (
    <Avatar
      size={24}
      src="/web/images/avatar/avatar-5.jpg"
      classNames={{ display: "mask is-octagon rounded-none" }}
    />
  );
};

export { Octagon };
