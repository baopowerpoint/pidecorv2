interface HeadingProps {
  title: string;
  description: string;
}

const Heading: React.FC<HeadingProps> = ({ title, description }) => {
  return (
    <div className="space-y-2">
      <h2 className="base-semibold ">{title}</h2>
      <p className="small-regular text-light-400">{description}</p>
    </div>
  );
};

export default Heading;
