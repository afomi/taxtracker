# frozen_string_literal: true

# Adds record-specific metadata to pages emitted by jekyll-datapage-generator.
# The generator runs after the data pages exist and before layouts are rendered.
module Jekyll
  class TaxSeoGenerator < Generator
    safe true
    priority :lowest

    def generate(site)
      site.pages.each do |page|
        tax = page.data["tax"]
        next unless tax

        jurisdiction = tax.dig("jurisdiction", "name")
        search_name = search_name(tax, jurisdiction)
        page.data["title"] = [search_name, jurisdiction].compact.join(" in ")
        page.data["description"] = tax_description(tax, search_name, jurisdiction)
        page.data["last_modified_at"] = tax["updated_at"] if tax["updated_at"]
      end
    end

    private

    def search_name(tax, jurisdiction)
      name = tax["name"].sub(/\s+\([^)]*\)\z/, "")
      measure = name.match(/\AMeasure\s+[A-Z0-9]+/)&.to_s

      full_title = [name, jurisdiction].compact.join(" in ")
      return "#{measure} #{tax['type'].capitalize} Tax" if measure && full_title.length > 55

      name
    end

    def tax_description(tax, search_name, jurisdiction)
      "View #{tax['type']} tax rates, revenue, administering agency, and official sources for #{search_name} in #{jurisdiction}."
    end
  end
end
