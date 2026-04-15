"use client";

import CatalogContent from "@/components/catalog/CatalogContent";
import CatalogHeader from "@/components/catalog/CatalogHeader";
import FiltersSidebar from "@/components/FiltersSidebar";
import { useCatalog } from "@/hooks/useCatalog";

export default function CatalogSection() {
  const catalog = useCatalog();

  return (
    <section className="max-w-7xl mx-auto px-6 py-8 flex gap-8">
      <FiltersSidebar
        categories={catalog.categories}
        selectedCategory={catalog.selectedCategory}
        onCategoryChange={catalog.onCategoryChange}
        selectedPriceRange={catalog.selectedPriceRange}
        onPriceRangeChange={catalog.onPriceRangeChange}
        isLoadingCategories={catalog.isLoadingCategories}
      />
      <div className="flex-1 min-w-0">
        <CatalogHeader
          title={catalog.sectionTitle}
          resultCount={catalog.totalFiltered}
          isLoading={catalog.isLoadingProducts}
          disabled={catalog.isLoadingProducts || catalog.isError}
          currentSort={catalog.sortBy}
          onSortChange={catalog.onSortChange}
          viewMode={catalog.viewMode}
          onViewModeChange={catalog.onViewModeChange}
        />

        <CatalogContent
          isLoading={catalog.isLoadingProducts}
          isError={catalog.isError}
          errorMessage={catalog.errorMessage}
          onRetry={catalog.onRetry}
          products={catalog.visible}
          viewMode={catalog.viewMode}
          hasMore={catalog.hasMore}
          onShowMore={catalog.onShowMore}
        />
      </div>
    </section>
  );
}
