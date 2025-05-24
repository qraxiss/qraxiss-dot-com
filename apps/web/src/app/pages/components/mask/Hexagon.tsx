import { Avatar } from "@/components/ui";

const Hexagon = () => {
  return (
    <div className="inline-space">
      <Avatar
        size={24}
        src="/web/images/avatar/avatar-5.jpg"
        classNames={{ display: "mask is-hexagon rounded-none" }}
      />

      <Avatar
        size={24}
        src="/web/images/avatar/avatar-5.jpg"
        classNames={{ display: "mask is-hexagon-2 rounded-none" }}
      />
    </div>
  );
};

export { Hexagon };
