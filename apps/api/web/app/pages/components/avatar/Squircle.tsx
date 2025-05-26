import { Avatar } from "@/components/ui";

const Squircle = () => {
  return (
    <div className="inline-space">
      <Avatar
        size={8}
        src="/web/images/avatar/avatar-16.jpg"
        classNames={{ display: "mask is-squircle rounded-none" }}
      />
      <Avatar
        size={10}
        src="/web/images/avatar/avatar-10.jpg"
        classNames={{ display: "mask is-squircle rounded-none" }}
      />

      <Avatar
        src="/web/images/avatar/avatar-20.jpg"
        classNames={{ display: "mask is-squircle rounded-none" }}
      />
      <Avatar
        size={16}
        src="/web/images/avatar/avatar-19.jpg"
        classNames={{ display: "mask is-squircle rounded-none" }}
      />
      <Avatar
        size={20}
        src="/web/images/avatar/avatar-8.jpg"
        classNames={{ display: "mask is-squircle rounded-none" }}
      />
      <Avatar
        size={24}
        src="/web/images/avatar/avatar-5.jpg"
        classNames={{ display: "mask is-squircle rounded-none" }}
      />
    </div>
  );
};

export { Squircle };
