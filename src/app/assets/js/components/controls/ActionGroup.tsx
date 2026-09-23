import ActionBtn from "./ActionBtn";

const ActionGroup: React.FC = () => {
    return (
        <div className="flex flex-row gap-2">
            <ActionBtn />
            <ActionBtn />
            <ActionBtn />
        </div>
    );
};

export default ActionGroup;