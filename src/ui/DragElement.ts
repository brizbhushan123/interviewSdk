type Corner = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
type Shape = 'circle' | 'square' | 'rectangle';

interface DragOptions {
  drag?: boolean;
  position?: Corner | { x: number; y: number };
  allowNearestCorner?: boolean;
  width?: number;
  height?: number;
}

export class DragElement {
  static set(el: HTMLElement, optionsOrShape?: DragOptions, shapeArg?: Shape) {
    const defaultMargin = 20;
    let shape: Shape | undefined;
    let options: DragOptions = {};

    // Parse parameters
    if (typeof optionsOrShape === 'string') {
      shape = optionsOrShape;
    } else {
      options = optionsOrShape || {};
      shape = shapeArg;
    }

    const defaultSize = 150;

    const width = options.width ?? defaultSize;
    let height = options.height ?? defaultSize;

    // Apply shape logic (overwrite height, preserve width)
    if (shape) {
      const width = options.width ?? el.offsetWidth;
      if (shape === 'circle' || shape === 'square') {
        options.height = width;
        el.style.borderRadius = shape === 'circle' ? '50%' : '4px';
      } else if (shape === 'rectangle') {
        // options.height = width * 0.6;
        options.width = 202;
        options.height = 120;
        el.style.borderRadius = '2px';
      }
    }

    // Set initial dimensions
    if(shape === 'rectangle'){
      el.style.width = `${options.width}px`;
      el.style.height = `${options.height}px`;
    }else{
      el.style.width = `${width}px`;
      el.style.height = `${height}px`;
    }

    el.style.position = 'fixed';
    el.style.zIndex = '999';
    el.style.cursor = options.drag === false ? 'default' : 'move';
    el.style.userSelect = 'none';

    // Positioning logic
    const setPosition = () => {
      const { innerWidth, innerHeight } = window;
      const elWidth = el.offsetWidth;
      const elHeight = el.offsetHeight;

      let x = defaultMargin;
      let y = defaultMargin;

      if (options.position) {
        if (typeof options.position === 'string') {
          switch (options.position) {
            case 'topLeft':
              x = defaultMargin;
              y = defaultMargin;
              break;
            case 'topRight':
              x = innerWidth - elWidth - defaultMargin;
              y = defaultMargin;
              break;
            case 'bottomLeft':
              x = defaultMargin;
              y = innerHeight - elHeight - defaultMargin;
              break;
            case 'bottomRight':
              x = innerWidth - elWidth - defaultMargin;
              y = innerHeight - elHeight - defaultMargin;
              break;
          }
        } else {
          x = options.position.x;
          y = options.position.y;
        }
      } else {
        // Default bottomRight
        x = innerWidth - elWidth - defaultMargin;
        y = innerHeight - elHeight - defaultMargin;
      }

      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
    };

    setPosition();

    // Recalculate on resize
    window.addEventListener('resize', () => {
      setPosition();
    });

    // Drag logic
    if (options.drag !== false) {
      let offsetX = 0;
      let offsetY = 0;
      let isDragging = false;

      const onMove = (clientX: number, clientY: number) => {
        if (!isDragging) return;

        const newX = clientX - offsetX;
        const newY = clientY - offsetY;

        const maxX = window.innerWidth - el.offsetWidth - defaultMargin;
        const maxY = window.innerHeight - el.offsetHeight - defaultMargin;
        const clampedX = Math.max(defaultMargin, Math.min(newX, maxX));
        const clampedY = Math.max(defaultMargin, Math.min(newY, maxY));

        el.style.left = `${clampedX}px`;
        el.style.top = `${clampedY}px`;
      };

      const onMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;
        e.preventDefault();
        onMove(e.clientX, e.clientY);
      };

      const onTouchMove = (e: TouchEvent) => {
        if (!isDragging || e.touches.length === 0) return;
        e.preventDefault();
        const touch = e.touches[0];
        onMove(touch.clientX, touch.clientY);
      };

      const startDrag = (clientX: number, clientY: number) => {
        const rect = el.getBoundingClientRect();
        offsetX = clientX - rect.left;
        offsetY = clientY - rect.top;
        isDragging = true;
        el.style.transition = 'none'; // disable transitions during drag
      };

      const endDrag = () => {
        if (!isDragging) return;
        isDragging = false;
        el.style.transition = ''; // restore transitions if needed

        if (options.allowNearestCorner) {
          const { innerWidth, innerHeight } = window;
          const rect = el.getBoundingClientRect();

          const corners = {
            topLeft: { x: defaultMargin, y: defaultMargin },
            topRight: { x: innerWidth - rect.width - defaultMargin, y: defaultMargin },
            bottomLeft: { x: defaultMargin, y: innerHeight - rect.height - defaultMargin },
            bottomRight: {
              x: innerWidth - rect.width - defaultMargin,
              y: innerHeight - rect.height - defaultMargin,
            },
          };

          // Calculate distances
          const currentCenter = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          };

          let nearestCorner = 'bottomRight';
          let minDistance = Infinity;

          for (const [cornerName, pos] of Object.entries(corners)) {
            const dx = currentCenter.x - (pos.x + rect.width / 2);
            const dy = currentCenter.y - (pos.y + rect.height / 2);
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < minDistance) {
              minDistance = distance;
              nearestCorner = cornerName;
            }
          }

          // Snap to the nearest corner
          const nearestPos = corners[nearestCorner as Corner];
          el.style.left = `${nearestPos.x}px`;
          el.style.top = `${nearestPos.y}px`;
          el.style.transition = 'all 0.3s ease';
        }
      };

      el.addEventListener('mousedown', (e) => {
        e.preventDefault();
        startDrag(e.clientX, e.clientY);
      });

      el.addEventListener('touchstart', (e) => {
        if (e.touches.length > 0) {
          e.preventDefault();
          startDrag(e.touches[0].clientX, e.touches[0].clientY);
        }
      });

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', endDrag);

      document.addEventListener('touchmove', onTouchMove, { passive: false });
      document.addEventListener('touchend', endDrag);
    }
  }
}
