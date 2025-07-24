const Section: React.FC<{ className?: string; children: React.ReactNode }> = ({
  children,
  className,
}) => {
  return (
    <section className={`${className ? className : "md:py-10"} py-8`}>
      {children}
    </section>
  );
};

export default Section;
