'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import 'material-icons/iconfont/material-icons.css';

interface LegoViewerProps {
  src?: string;
  title?: string;
}

const iconButton: React.CSSProperties = {
  border: 'none',
  background: 'white',
  borderRadius: 8,
  width: 40,
  height: 40,
  cursor: 'pointer',
  display: 'grid',
  placeItems: 'center',
  boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
};

export default function LegoViewer({
  src = '/models/Veronika.mpd',
  title = 'Bauanleitung',
}: LegoViewerProps) {
  const [ready, setReady] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import('brick-viewer').then(() => setReady(true));
  }, []);

  // Esc schließt das Popup
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Vollbild-Status synchronisieren
  useEffect(() => {
    const onChange = () => setIsFullscreen(document.fullscreenElement === panelRef.current);
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  // Resize triggern, damit der Viewer sich neu zeichnet
  useEffect(() => {
    if (!ready) return;
    const t = setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
    return () => clearTimeout(t);
  }, [ready, open, isFullscreen]);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else panelRef.current?.requestFullscreen?.();
  };

  const close = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    setOpen(false);
  };

  const viewer = (
    <brick-viewer
      src={src}
      style={{ position: 'absolute', inset: 0, display: 'block', width: '100%', height: '100%' }}
    />
  );

  const loading = (
    <div style={{ height: '100%', display: 'grid', placeItems: 'center', color: '#666' }}>Lade 3D-Viewer...</div>
  );

  return (
    <>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: 'relative',
          width: '100%',
          height: 450, // Feste Höhe vergeben, damit der Kasten nicht kollabiert
          background: '#e9ecef', // Neutraler Hintergrund, um zu sehen, ob der Container da ist
          borderRadius: 12,
          overflow: 'hidden',
          boxShadow: hovered ? '0 6px 20px rgba(0,0,0,0.18)' : '0 1px 4px rgba(0,0,0,0.08)',
          transition: 'box-shadow 0.2s, transform 0.2s',
        }}
      >
        {ready ? viewer : loading}

        <button
          onClick={() => setOpen(true)}
          aria-label="Vergrößern"
          style={{
            ...iconButton,
            position: 'absolute',
            top: 12,
            right: 12,
            zIndex: 1,
            opacity: hovered ? 1 : 0.6,
            transition: 'opacity 0.2s',
          }}
        >
          <span className="material-icons">open_in_full</span>
        </button>
      </div>

      {open &&
        createPortal(
          <div
            onClick={close}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1000,
              display: 'grid',
              placeItems: 'center',
              background: 'rgba(0,0,0,0.3)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
          >
            <div
              ref={panelRef}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: isFullscreen ? '100%' : 'min(1000px, 92vw)',
                height: isFullscreen ? '100%' : 'min(700px, 85vh)',
                background: '#f0f0f0',
                borderRadius: isFullscreen ? 0 : 12,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                }}
              >
                <h2 style={{ margin: 0 }}>{title}</h2>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={toggleFullscreen} style={iconButton} aria-label="Vollbild">
                    <span className="material-icons">
                      {isFullscreen ? 'fullscreen_exit' : 'fullscreen'}
                    </span>
                  </button>
                  <button onClick={close} style={iconButton} aria-label="Schließen">
                    <span className="material-icons">close</span>
                  </button>
                </div>
              </div>

              <div style={{ flex: 1, minHeight: 0, position: 'relative' }}>
                {ready ? viewer : loading}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}