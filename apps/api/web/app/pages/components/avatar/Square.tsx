import { Avatar } from "@/components/ui";

const Square = () => {
  return (
    <div className="inline-space">
      <Avatar
        size={8}
        src="/web/images/avatar/avatar-16.jpg"
        classNames={{ display: "rounded-lg" }}
      />
      <Avatar
        size={10}
        src="/web/images/avatar/avatar-10.jpg"
        classNames={{ display: "rounded-lg" }}
      />

      <Avatar
        src="/web/images/avatar/avatar-20.jpg"
        classNames={{ display: "rounded-lg" }}
      />
      <Avatar
        size={16}
        src="/web/images/avatar/avatar-19.jpg"
        classNames={{ display: "rounded-lg" }}
      />
      <Avatar
        size={20}
        src="/web/images/avatar/avatar-8.jpg"
        classNames={{ display: "rounded-lg" }}
      />
      <Avatar
        size={24}
        src="/web/images/avatar/avatar-5.jpg"
        classNames={{ display: "rounded-lg" }}
      />
    </div>
  );
};

export { Square };
