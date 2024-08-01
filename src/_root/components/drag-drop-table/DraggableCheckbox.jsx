import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import PropTypes from "prop-types";
import { Checkbox } from "antd";

const DraggableCheckbox = ({ id, index, moveCheckbox, label, value, checkedList, setCheckedList }) => {
    const ref = useRef(null);

    const [, drop] = useDrop({
        accept: "checkbox",
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            moveCheckbox(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: "checkbox",
        item: { id, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(drop(ref));

    return (
        <div ref={ref} style={{ opacity: isDragging ? 0 : 1 }}>
            <Checkbox
                checked={checkedList.includes(value)}
                onChange={(e) => {
                    if (e.target.checked) {
                        setCheckedList([...checkedList, value]);
                    } else {
                        setCheckedList(checkedList.filter((item) => item !== value));
                    }
                }}
            >
                {label}
            </Checkbox>
        </div>
    );
};

DraggableCheckbox.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    index: PropTypes.number,
    moveCheckbox: PropTypes.func,
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    checkedList: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    setCheckedList: PropTypes.func,
};

const Content = ({ options, checkedList, setCheckedList, moveCheckbox }) => (
    <DndProvider backend={HTML5Backend}>
        {options.map((option, index) => (
            <DraggableCheckbox
                key={option.value}
                id={option.value}
                index={index}
                moveCheckbox={moveCheckbox}
                label={option.label}
                value={option.value}
                checkedList={checkedList}
                setCheckedList={setCheckedList}
            />
        ))}
    </DndProvider>
);

Content.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        })
    ),
    checkedList: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    setCheckedList: PropTypes.func,
    moveCheckbox: PropTypes.func,
};

export default Content