const ActionBtn: React.FC = () => {
  return (
    <div className="w-20 h-12 flex flex-col rounded-md overflow-hidden">
      <div className="flex-1 bg-void">
        <div className="h-full text-center content-center">
          <p className="text-sm text-ghost">foo</p>
        </div>
      </div>
      <div className="flex-1 bg-electric">
        <div className="h-full text-sm text-ghost items-center justify-center">
          <button className="h-full w-full">0</button>
        </div>
      </div>
    </div>
  );
};

export default ActionBtn;
