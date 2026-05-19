import React, { useState, useEffect, useMemo } from 'react';
import VendorCard from './VendorCard';
import { fetchVendors } from '../../services/vendorService';

// ── Category definitions with icons ─────────────────────────────────────────
const CATEGORIES = [
  { label: 'All',          value: '',              icon: '✨' },
  { label: 'Photography',  value: 'Photography',   icon: '📸' },
  { label: 'Videography',  value: 'Videography',   icon: '🎥' },
  { label: 'Catering',     value: 'Catering',      icon: '🍽️' },
  { label: 'Venue',        value: 'Venue',         icon: '🏛️' },
  { label: 'Decoration',   value: 'Decoration',    icon: '🌸' },
  { label: 'Music',        value: 'Music',         icon: '🎵' },
  { label: 'Wedding Cars', value: 'Wedding Cars',  icon: '🚗' },
  { label: 'Florist',      value: 'Florist',       icon: '💐' },
  { label: 'Bridal Wear',  value: 'Bridal Wear',   icon: '👗' },
  { label: 'Hair & Makeup',value: 'Hair & Makeup', icon: '💄' },
  { label: 'Jewelry',      value: 'Jewelry',       icon: '💍' },
  { label: 'Honeymoon',    value: 'Honeymoon',     icon: '✈️' },
  { label: 'Other',        value: 'Other',         icon: '🎨' },
];

// ── Price range options ──────────────────────────────────────────────────────
const PRICE_RANGES = [
  { label: 'All Budgets', value: '' },
  { label: '💰 Budget',    value: 'Budget' },
  { label: '🥂 Mid-Range', value: 'Mid-Range' },
  { label: '🌟 Premium',   value: 'Premium' },
  { label: '👑 Luxury',    value: 'Luxury' },
];

// ── Sort options ─────────────────────────────────────────────────────────────
const SORT_OPTIONS = [
  { label: 'Default',            value: '' },
  { label: 'Rating: High → Low', value: 'rating_desc' },
  { label: 'Rating: Low → High', value: 'rating_asc' },
  { label: 'Name: A → Z',        value: 'name_asc' },
  { label: 'Name: Z → A',        value: 'name_desc' },
];

// ── Styles ───────────────────────────────────────────────────────────────────
const pillBase = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  padding: '8px 16px',
  borderRadius: '100px',
  cursor: 'pointer',
  fontFamily: 'var(--font-body)',
  fontSize: '12px',
  letterSpacing: '0.04em',
  whiteSpace: 'nowrap',
  transition: 'all 0.2s ease',
  border: '1px solid #EDE0DF',
};

const pillActive = {
  ...pillBase,
  background: '#C9A84C',
  color: '#fff',
  border: '1px solid #C9A84C',
  boxShadow: '0 2px 8px rgba(201,168,76,0.3)',
};

const pillInactive = {
  ...pillBase,
  background: '#fff',
  color: '#2C2C2C',
};

const pricePillBase = {
  padding: '7px 14px',
  borderRadius: '2px',
  cursor: 'pointer',
  fontFamily: 'var(--font-body)',
  fontSize: '11px',
  letterSpacing: '0.08em',
  transition: 'all 0.2s ease',
  border: '1px solid #EDE0DF',
  whiteSpace: 'nowrap',
};

// ── Component ────────────────────────────────────────────────────────────────
const VendorList = () => {
  const [vendors, setVendors]     = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);
  const [category, setCategory]   = useState('');
  const [search, setSearch]       = useState('');
  const [sortBy, setSortBy]       = useState('');
  const [priceRange, setPriceRange] = useState('');

  // Re-fetch from backend whenever category changes (server-side filter)
  useEffect(() => { loadVendors(); }, [category]);

  const loadVendors = async () => {
    try {
      setLoading(true);
      const data = await fetchVendors(category);
      setVendors(data);
      setError(null);
    } catch (err) {
      setError('Failed to load vendors. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Client-side: search, price-range, sort
  const filteredAndSorted = useMemo(() => {
    let result = [...vendors];

    // Search by name or description
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(v =>
        v.businessName?.toLowerCase().includes(q) ||
        v.description?.toLowerCase().includes(q)
      );
    }

    // Price range (keyword match on priceRange string)
    if (priceRange) {
      result = result.filter(v =>
        v.priceRange?.toLowerCase().includes(priceRange.toLowerCase())
      );
    }

    // Sort
    switch (sortBy) {
      case 'rating_desc': result.sort((a, b) => (b.rating || 0) - (a.rating || 0)); break;
      case 'rating_asc':  result.sort((a, b) => (a.rating || 0) - (b.rating || 0)); break;
      case 'name_asc':    result.sort((a, b) => a.businessName?.localeCompare(b.businessName)); break;
      case 'name_desc':   result.sort((a, b) => b.businessName?.localeCompare(a.businessName)); break;
      default: break;
    }

    return result;
  }, [vendors, search, sortBy, priceRange]);

  const hasActiveFilters = search || sortBy || priceRange;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>

      {/* ── Search Bar ──────────────────────────────────────────────────── */}
      <div style={{ position: 'relative', marginBottom: '28px' }}>
        <span style={{
          position: 'absolute', left: '16px', top: '50%',
          transform: 'translateY(-50%)', fontSize: '16px', pointerEvents: 'none',
        }}>
          🔍
        </span>
        <input
          id="vendor-search"
          type="text"
          placeholder="Search by vendor name or description…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: '100%',
            padding: '14px 16px 14px 46px',
            border: '1px solid #EDE0DF',
            borderRadius: '2px',
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            color: '#2C2C2C',
            outline: 'none',
            boxSizing: 'border-box',
            transition: 'border-color 0.2s',
            background: '#fff',
          }}
          onFocus={e => e.target.style.borderColor = '#C9A84C'}
          onBlur={e => e.target.style.borderColor = '#EDE0DF'}
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            style={{
              position: 'absolute', right: '12px', top: '50%',
              transform: 'translateY(-50%)', background: 'none', border: 'none',
              cursor: 'pointer', color: '#aaa', fontSize: '18px', lineHeight: 1,
            }}
          >
            ×
          </button>
        )}
      </div>

      {/* ── Category Pill Bar ────────────────────────────────────────────── */}
      <div style={{
        overflowX: 'auto',
        paddingBottom: '10px',
        marginBottom: '24px',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}>
        <div style={{ display: 'flex', gap: '10px', width: 'max-content' }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat.value}
              id={`category-pill-${cat.value || 'all'}`}
              onClick={() => setCategory(cat.value)}
              style={category === cat.value ? pillActive : pillInactive}
              onMouseEnter={e => {
                if (category !== cat.value) {
                  e.currentTarget.style.borderColor = '#C9A84C';
                  e.currentTarget.style.color = '#C9A84C';
                }
              }}
              onMouseLeave={e => {
                if (category !== cat.value) {
                  e.currentTarget.style.borderColor = '#EDE0DF';
                  e.currentTarget.style.color = '#2C2C2C';
                }
              }}
            >
              <span style={{ fontSize: '14px' }}>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Sort + Price Range Controls ──────────────────────────────────── */}
      <div style={{
        display: 'flex',
        gap: '16px',
        marginBottom: '32px',
        flexWrap: 'wrap',
        alignItems: 'center',
        padding: '16px 20px',
        background: '#FDFAF9',
        border: '1px solid #EDE0DF',
        borderRadius: '2px',
      }}>

        {/* Sort */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{
            fontFamily: 'var(--font-body)', fontSize: '10px',
            letterSpacing: '0.18em', textTransform: 'uppercase', color: '#888',
          }}>
            Sort by
          </span>
          <select
            id="vendor-sort"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            style={{
              padding: '7px 12px',
              border: '1px solid #EDE0DF',
              borderRadius: '2px',
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              color: '#2C2C2C',
              outline: 'none',
              background: '#fff',
              cursor: 'pointer',
            }}
          >
            {SORT_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {/* Divider */}
        <div style={{ width: '1px', height: '28px', background: '#EDE0DF' }} />

        {/* Price Range */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <span style={{
            fontFamily: 'var(--font-body)', fontSize: '10px',
            letterSpacing: '0.18em', textTransform: 'uppercase', color: '#888',
          }}>
            Budget
          </span>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {PRICE_RANGES.map(p => (
              <button
                key={p.value}
                id={`price-filter-${p.value || 'all'}`}
                onClick={() => setPriceRange(p.value)}
                style={{
                  ...pricePillBase,
                  background: priceRange === p.value ? '#C0392B' : '#fff',
                  color: priceRange === p.value ? '#fff' : '#2C2C2C',
                  border: `1px solid ${priceRange === p.value ? '#C0392B' : '#EDE0DF'}`,
                }}
                onMouseEnter={e => {
                  if (priceRange !== p.value) {
                    e.currentTarget.style.borderColor = '#C0392B';
                    e.currentTarget.style.color = '#C0392B';
                  }
                }}
                onMouseLeave={e => {
                  if (priceRange !== p.value) {
                    e.currentTarget.style.borderColor = '#EDE0DF';
                    e.currentTarget.style.color = '#2C2C2C';
                  }
                }}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            id="clear-filters-btn"
            onClick={() => { setSearch(''); setSortBy(''); setPriceRange(''); }}
            style={{
              marginLeft: 'auto',
              padding: '7px 14px',
              border: '1px solid #EDE0DF',
              background: 'none',
              color: '#888',
              borderRadius: '2px',
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              letterSpacing: '0.08em',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#C0392B';
              e.currentTarget.style.color = '#C0392B';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = '#EDE0DF';
              e.currentTarget.style.color = '#888';
            }}
          >
            ✕ Clear Filters
          </button>
        )}
      </div>

      {/* ── Results Header ───────────────────────────────────────────────── */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: '24px',
      }}>
        <h2 style={{
          fontFamily: 'var(--font-brand)', fontSize: '26px',
          fontWeight: 300, fontStyle: 'italic', color: '#2C2C2C', margin: 0,
        }}>
          {category
            ? `${CATEGORIES.find(c => c.value === category)?.icon} ${category} Vendors`
            : 'All Vendors'
          }
        </h2>
        {!loading && (
          <span style={{
            fontFamily: 'var(--font-body)', fontSize: '12px',
            color: '#888', letterSpacing: '0.05em',
          }}>
            {filteredAndSorted.length} vendor{filteredAndSorted.length !== 1 ? 's' : ''} found
          </span>
        )}
      </div>

      {/* ── Error ────────────────────────────────────────────────────────── */}
      {error && (
        <div style={{
          padding: '14px 16px', marginBottom: '24px',
          color: '#C0392B', background: '#FDF0EE', border: '1px solid #F5C6C0',
          fontFamily: 'var(--font-body)', fontSize: '13px',
        }}>
          {error}
        </div>
      )}

      {/* ── Grid / States ────────────────────────────────────────────────── */}
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '260px' }}>
          <div style={{
            width: '44px', height: '44px',
            border: '3px solid #EDE0DF',
            borderTopColor: '#C0392B',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }} />
        </div>
      ) : filteredAndSorted.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0', color: '#2C2C2C' }}>
          <div style={{ fontSize: '52px', marginBottom: '16px' }}>🔍</div>
          <p style={{
            fontFamily: 'var(--font-brand)', fontSize: '22px',
            fontStyle: 'italic', color: '#2C2C2C', marginBottom: '8px',
          }}>
            No vendors found.
          </p>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '13px',
            color: '#888', letterSpacing: '0.05em',
          }}>
            Try adjusting your search or filters.
          </p>
          {hasActiveFilters && (
            <button
              onClick={() => { setSearch(''); setSortBy(''); setPriceRange(''); setCategory(''); }}
              style={{
                marginTop: '20px', padding: '10px 24px',
                background: '#C0392B', color: '#fff',
                border: 'none', borderRadius: '2px',
                fontFamily: 'var(--font-body)', fontSize: '12px',
                letterSpacing: '0.12em', cursor: 'pointer',
              }}
            >
              CLEAR ALL FILTERS
            </button>
          )}
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '24px',
        }}>
          {filteredAndSorted.map(vendor => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      )}

      {/* Spinner keyframe */}
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default VendorList;
