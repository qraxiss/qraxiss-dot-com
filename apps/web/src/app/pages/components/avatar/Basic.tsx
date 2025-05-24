import { Avatar } from "@/components/ui";

const Basic = () => {
  return (
    <div className="inline-space">
      <Avatar size={8} src="/web/images/avatar/avatar-16.jpg" />
      <Avatar size={10} src="/web/images/avatar/avatar-10.jpg" />
      <Avatar src="/web/images/avatar/avatar-20.jpg" />
      <Avatar size={16} src="/web/images/avatar/avatar-19.jpg" />
      <Avatar size={20} src="/web/images/avatar/avatar-8.jpg" />
      <Avatar size={24} src="/web/images/avatar/avatar-5.jpg" />
    </div>
  );
};

export { Basic };
