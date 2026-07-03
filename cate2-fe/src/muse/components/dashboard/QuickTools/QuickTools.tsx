import { useNavigate } from 'react-router';
import { Palette, Users, Package } from 'lucide-react';
import { MUSE_ROUTES } from '@/muse/constants/routes';
import styles from './QuickTools.module.css';

const TOOLS = [
  {
    id:          'board',
    label:       'MUSE Boards',
    description: 'Generate mood boards with vendor-sourced products',
    icon:        <Palette size={16} />,
    route:       MUSE_ROUTES.BOARD,
    // Warm editorial tabletop image — placeholder gradient until real images added
    bg:          'linear-gradient(135deg, #8b7355 0%, #6b5a3e 50%, #4a3d28 100%)',
  },
  {
    id:          'staff',
    label:       'Staff Calculator',
    description: 'Calculate staffing roster with ratios and pricing',
    icon:        <Users size={16} />,
    route:       MUSE_ROUTES.STAFF_CALCULATOR,
    bg:          'linear-gradient(135deg, #2d3a2e 0%, #1a2a1b 50%, #111a12 100%)',
  },
  {
    id:          'equipment',
    label:       'Equipment Calculator',
    description: 'Build rental equipment orders with smart pricing',
    icon:        <Package size={16} />,
    route:       MUSE_ROUTES.EQUIPMENT_CALCULATOR,
    bg:          'linear-gradient(135deg, #7a6a4f 0%, #5c4f38 50%, #3d3425 100%)',
  },
];

export const QuickTools = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.grid}>
      {TOOLS.map((tool) => (
        <div
          key={tool.id}
          className={styles.card}
          onClick={() => navigate(tool.route)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && navigate(tool.route)}
        >
          {/* Image area with dark gradient overlay */}
          <div className={styles.imageArea} style={{ background: tool.bg }}>
            <div className={styles.overlay} />
            <div className={styles.imageLabel}>
              <span className={styles.imageLabelIcon}>{tool.icon}</span>
              <span>{tool.label}</span>
            </div>
          </div>

          {/* Description below image */}
          <div className={styles.description}>{tool.description}</div>
        </div>
      ))}
    </div>
  );
};