// src/muse/components/muse-board-result/ProductsTab/ProductsTab.tsx

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import type { MuseBoardProduct, MuseBoardResult } from '@/types/museBoard.types';
import styles from './ProductsTab.module.css';

/* ── Product Card ── */
interface ProductCardProps {
  product: MuseBoardProduct;
}

const ProductCard = ({ product }: ProductCardProps) => (
  <div className={styles.card}>
    <div className={styles.cardImageWrapper}>
      <img
        src={product.imageUrl}
        alt={product.name}
        className={styles.cardImage}
        loading="lazy"
      />
    </div>
    <div className={styles.cardBody}>
      <div className={styles.cardTop}>
        <span className={styles.cardName}>{product.name}</span>
        <span className={styles.cardVendor}>{product.vendor}</span>
        <div className={styles.cardSkuRow}>
          <span className={styles.cardSku}>{product.sku}</span>
          <span className={styles.cardPrice}>${product.price.toFixed(2)}</span>
        </div>
      </div>
      <div className={styles.cardTags}>
        {product.colors.slice(0, 2).map((c) => (
          <span key={c} className={styles.tag}>
            <span className={styles.tagLabel}>Color:</span> {c}
          </span>
        ))}
        {product.styles.slice(0, 2).map((s) => (
          <span key={s} className={styles.tag}>
            <span className={styles.tagLabel}>Style:</span> {s}
          </span>
        ))}
        {product.themes.slice(0, 1).map((t) => (
          <span key={t} className={styles.tag}>
            <span className={styles.tagLabel}>Theme:</span> {t}
          </span>
        ))}
      </div>
    </div>
  </div>
);

/* ── Sourcing Sheet ── */
interface SourcingSheetProps {
  products: MuseBoardProduct[];
}

const SourcingSheet = ({ products }: SourcingSheetProps) => (
  <div className={styles.sourcingWrapper}>
    <div className={styles.sourcingHeader}>
      <span className={styles.sourcingTitle}>Sourcing Sheet</span>
    </div>
    <div className={styles.sourcingScrollWrapper}>
      <table className={styles.sourcingTable}>
        <thead>
          <tr>
            <th className={`${styles.sth} ${styles.productCol}`}>Product</th>
            <th className={styles.sth}>Vendor</th>
            <th className={styles.sth}>SKU</th>
            <th className={styles.sth}>Category</th>
            <th className={`${styles.sth} ${styles.right}`}>Unit Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className={styles.srow}>
              <td className={`${styles.std} ${styles.boldCell}`}>{p.name}</td>
              <td className={`${styles.std} ${styles.vendorCell}`}>{p.vendor}</td>
              <td className={`${styles.std} ${styles.skuCell}`}>{p.sku}</td>
              <td className={styles.std}>{p.category}</td>
              <td className={`${styles.std} ${styles.right} ${styles.priceCell}`}>
                ${p.price.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

/* ── Products Tab ── */
interface ProductsTabProps {
  board: MuseBoardResult;
}

export const ProductsTab = ({ board }: ProductsTabProps) => {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search.trim()) return board.products;
    const q = search.toLowerCase();
    return board.products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.vendor.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q),
    );
  }, [board.products, search]);

  // Group by category, preserving insertion order
  const grouped = useMemo(() => {
    const map = new Map<string, MuseBoardProduct[]>();
    filtered.forEach((p) => {
      if (!map.has(p.category)) map.set(p.category, []);
      map.get(p.category)!.push(p);
    });
    return map;
  }, [filtered]);

  return (
    <div className={styles.tab}>

      {/* ── Search bar + count ── */}
      <div className={styles.searchRow}>
        <div className={styles.searchBox}>
          <Search size={14} className={styles.searchIcon} aria-hidden="true" />
          <input
            type="search"
            className={styles.searchInput}
            placeholder="Search catalog to add products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <span className={styles.productCount}>
          {board.productCount} products on board
        </span>
      </div>

      {/* ── Categories + product cards — fully dynamic ── */}
      {Array.from(grouped.entries()).map(([category, products]) => (
        <div key={category} className={styles.categorySection}>
          <h3 className={styles.categoryLabel}>{category.toUpperCase()}</h3>
          <div
            className={styles.productGrid}
            data-count={Math.min(products.length, 4)}
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      ))}

      {filtered.length === 0 && (
        <div className={styles.emptyState}>
          <p>No products match your search.</p>
        </div>
      )}

      {/* ── Sourcing Sheet ── */}
      <SourcingSheet products={board.products} />

    </div>
  );
};