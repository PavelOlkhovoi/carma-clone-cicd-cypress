/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  DndContext,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useWindowSize } from "@uidotdev/usehooks";

import { TopicMapContext } from "react-cismap/contexts/TopicMapContextProvider";

import { cn } from "@carma-commons/utils";

import { AppDispatch } from "../../store";
import {
  getBackgroundLayer,
  getLayers,
  getSelectedLayerIndex,
  getSelectedLayerIndexIsNoSelection,
  getShowLeftScrollButton,
  getShowRightScrollButton,
  setLayers,
  setSelectedLayerIndex,
  setSelectedLayerIndexNoSelection,
} from "../../store/slices/mapping";
import LayerButton from "./LayerButton";
import SecondaryView from "./SecondaryView";

import "./button.css";

const LayerWrapper = () => {
  const dispatch: AppDispatch = useDispatch();
  const { routedMapRef } = useContext<typeof TopicMapContext>(TopicMapContext);
  const size = useWindowSize();

  const layers = useSelector(getLayers);
  const backgroundLayer = useSelector(getBackgroundLayer);

  const selectedLayerIndex = useSelector(getSelectedLayerIndex);
  const isNoSelectionIndex = useSelector(getSelectedLayerIndexIsNoSelection);
  const showLeftScrollButton = useSelector(getShowLeftScrollButton);
  const showRightScrollButton = useSelector(getShowRightScrollButton);

  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });
  const style = {
    color: isOver ? "green" : undefined,
  };

  const getLayerPos = (id) => layers.findIndex((layer) => layer.id === id);

  const handleDragEnd = (event) => {
    routedMapRef?.leafletMap?.leafletElement.dragging.enable();
    const { active, over } = event;
    if (active.id !== over.id) {
      const originalPos = getLayerPos(active.id);
      const newPos = getLayerPos(over.id);
      const newLayers = arrayMove(layers, originalPos, newPos);
      dispatch(setLayers(newLayers));
      console.debug(
        "handleDragEnd newPos",
        newPos,
        selectedLayerIndex,
        isNoSelectionIndex
      );
      if (!isNoSelectionIndex && selectedLayerIndex !== newPos) {
        dispatch(setSelectedLayerIndex(newPos));
      }
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 2 } })
  );

  console.debug("RENDER: LayerWrapper selectedLayerIndex", selectedLayerIndex);

  return (
    <>
      <DndContext
        onDragEnd={handleDragEnd}
        sensors={sensors}
        onDragStart={() =>
          routedMapRef?.leafletMap?.leafletElement.dragging.disable()
        }
        modifiers={[restrictToHorizontalAxis]}
      >
        <div
          ref={setNodeRef}
          style={style}
          id="buttonWrapper"
          className="w-full h-9 z-[999]"
          onClick={() => {
            console.debug("onClick buttonWrapper");
            dispatch(setSelectedLayerIndexNoSelection());
          }}
        >
          <div className="relative w-[calc(100%-40px)] mx-auto h-full">
            {showLeftScrollButton && (
              <div
                className={cn(
                  "absolute left-14 top-0.5 bg-neutral-100 w-fit min-w-max flex items-center gap-2 px-3 rounded-3xl h-8 z-[99999999] button-shadow"
                )}
                role="button"
                onClick={() => {
                  document.getElementById("scrollWrapper").scrollBy({
                    left: -300,
                    behavior: "smooth",
                  });
                }}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </div>
            )}
            {showRightScrollButton && (
              <div
                className={cn(
                  "absolute -right-7 top-0.5 bg-neutral-100 w-fit min-w-max flex items-center gap-2 px-3 rounded-3xl h-8 z-[99999999] button-shadow"
                )}
                role="button"
                onClick={() => {
                  document.getElementById("scrollWrapper").scrollBy({
                    left: 300,
                    behavior: "smooth",
                  });
                }}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </div>
            )}
            <div className="w-full flex justify-center items-center h-full gap-2">
              <LayerButton
                icon="background"
                layer={backgroundLayer}
                index={-1}
                id={backgroundLayer.id}
                title=""
                background
              />
              {size.width > 640 && (
                <div
                  id="scrollWrapper"
                  className="flex overflow-x-hidden items-center h-20 gap-2"
                >
                  <SortableContext
                    items={layers}
                    strategy={horizontalListSortingStrategy}
                  >
                    {layers.map((layer, i) => (
                      <LayerButton
                        title={layer.title}
                        id={layer.id}
                        key={layer.id}
                        index={i}
                        icon={
                          layer.title.includes("Orthofoto")
                            ? "ortho"
                            : layer.title === "Bäume"
                            ? "bäume"
                            : layer.title.includes("gärten")
                            ? "gärten"
                            : undefined
                        }
                        layer={layer}
                      />
                    ))}
                  </SortableContext>
                </div>
              )}
            </div>
          </div>
        </div>
      </DndContext>

      {!isNoSelectionIndex && <SecondaryView />}
    </>
  );
};

export default LayerWrapper;
