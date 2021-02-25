const Message = ({ variant, children }) => {
  return (
    <div>
      <div className={`alert alert-${variant}`} role="alert">
        {children}
      </div>
    </div>
  );
};

Message.defaultProps = {
  variant: "info",
};

export default Message;
