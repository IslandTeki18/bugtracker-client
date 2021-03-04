const Message = ({ variant, children }) => {
  return (
    <div>
      <div className={`alert alert-${variant} alert-dismissible`} role="alert">
        {children}
      </div>
    </div>
  );
};

Message.defaultProps = {
  variant: "info",
};

export default Message;
