import React, { useState, useMemo } from 'react';
import { PortalHeader } from './PortalHeader';
import { PrimaryButton, SecondaryButton } from './Buttons';

interface LegalDecision {
  id: string;
  topic: string;
  summary: string;
  fullContent: string;
  tags: string[];
  relatedTypes: string[];
  owner: string;
  effectiveDate: string;
  visibility: 'Public' | 'Internal' | 'Confidential';
  views: number;
}

const allTags = ['Patent', 'Trademark', 'Copyright', 'Open Source', 'Licensing', 'AI/ML', 'Software', 'API', 'Fair Use', 'Compliance'];

const mockDecisions: LegalDecision[] = [
  {
    id: '1',
    topic: 'Software Patent Eligibility under Alice Corp.',
    summary: 'Recent guidance on abstract idea determination for AI/ML algorithms and technical improvements to computer functionality.',
    fullContent: `This decision provides comprehensive guidance on software patent eligibility following the Alice Corp. v. CLS Bank International ruling. Key considerations include:

1. Abstract Idea Test: The invention must not be directed to an abstract idea. For AI/ML algorithms, focus on:
   - Specific technical improvements to computer functionality
   - Novel data structures or processing techniques
   - Measurable performance improvements

2. Inventive Concept: If directed to an abstract idea, there must be an inventive concept that transforms it into patent-eligible subject matter. Examples include:
   - Unconventional arrangements of computing components
   - Specific adaptations to solve a technical problem
   - Non-routine implementation details

3. Best Practices for Patent Applications:
   - Emphasize technical improvements and measurable benefits
   - Describe the "how" in detail, not just the "what"
   - Include performance metrics and comparative data
   - Avoid claiming the abstract idea itself

4. Recent Case Law Updates:
   - CAFC decisions favoring patents with specific technical implementations
   - USPTO guidance on AI/ML patent examination
   - Industry-specific considerations for software innovations

When preparing patent disclosures for software inventions, ensure that the description focuses on the technical solution and improvements rather than the business problem being solved.`,
    tags: ['Patent', 'Software', 'AI/ML'],
    relatedTypes: ['Patent Application', 'Freedom to Operate Opinion'],
    owner: 'Sarah Johnson',
    effectiveDate: '2026-04-15',
    visibility: 'Public',
    views: 342
  },
  {
    id: '2',
    topic: 'Open Source License Compliance',
    summary: 'Best practices for GPL, MIT, and Apache 2.0 compliance in commercial software products and derivative works.',
    fullContent: `This guidance covers compliance requirements for the most common open source licenses used in commercial software development.

GPL (General Public License):
- Copyleft requirements: derivative works must be released under GPL
- Source code disclosure obligations when distributing binaries
- Linking considerations (static vs. dynamic)
- Commercial use is permitted but must comply with distribution terms

MIT License:
- Very permissive with minimal restrictions
- Requires copyright notice and license text in distributions
- No copyleft obligations
- Can be incorporated into proprietary software

Apache 2.0:
- Similar to MIT but with explicit patent grants
- Requires notice of modifications
- Patent retaliation clause
- Popular for enterprise software

Best Practices:
1. Maintain a software bill of materials (SBOM)
2. Review licenses before incorporating dependencies
3. Ensure compliance with attribution requirements
4. Train developers on license obligations
5. Implement automated license scanning in CI/CD

Risk Mitigation:
- Avoid GPL in closed-source products unless prepared for copyleft obligations
- Use compatible licenses when combining components
- Document license compliance in release processes`,
    tags: ['Copyright', 'Open Source', 'Licensing', 'Compliance'],
    relatedTypes: ['License Agreement Review', 'Copyright Protection'],
    owner: 'David Lee',
    effectiveDate: '2026-04-10',
    visibility: 'Public',
    views: 289
  },
  {
    id: '3',
    topic: 'API Copyright Protection',
    summary: 'Guidance on copyrightability of APIs following Oracle v. Google and implications for software interoperability.',
    fullContent: `Following the Oracle America, Inc. v. Google LLC Supreme Court decision, this guidance clarifies the copyright status of APIs and best practices for API design and use.

Key Findings from Oracle v. Google:
- API declarations can be copyrightable
- Fair use analysis applies to API copying
- Transformative use and amount copied are critical factors
- Industry practice and standards matter

API Design Considerations:
1. Original APIs should reflect creative choices in structure and organization
2. Document design decisions to establish originality
3. Consider industry standards and interoperability needs
4. Distinguish functional elements from creative expression

When Using Third-Party APIs:
- Review license terms carefully
- Consider fair use factors if no license exists
- Evaluate alternatives and clean-room implementations
- Document business justification and transformative use

Protecting Your APIs:
- Copyright registration for API documentation
- License terms for API access and use
- Terms of service for API consumers
- Patent protection for novel technical implementations

Interoperability and Standards:
- Industry standards may limit copyright protection
- Network effects and lock-in considerations
- Reverse engineering for compatibility purposes
- Open standards vs. proprietary protocols`,
    tags: ['Copyright', 'API', 'Fair Use', 'Software'],
    relatedTypes: ['Copyright Protection', 'License Agreement Review'],
    owner: 'Michael Brown',
    effectiveDate: '2026-04-05',
    visibility: 'Public',
    views: 456
  },
  {
    id: '4',
    topic: 'AI Training Data and Copyright Implications',
    summary: 'Analysis of copyright considerations when using third-party content for machine learning model training.',
    fullContent: `This decision addresses the emerging legal landscape around using copyrighted materials in AI/ML training datasets.

Copyright Issues in AI Training:
1. Reproduction Rights: Copying content into training datasets may constitute reproduction
2. Derivative Works: Models that can regenerate training data may create derivative works
3. Fair Use Analysis: Courts are developing frameworks for AI training fair use
4. Database Rights: EU and other jurisdictions have specific database protections

Fair Use Considerations:
- Purpose and character: research vs. commercial use
- Nature of copyrighted work: factual vs. creative
- Amount used: entire works vs. excerpts
- Market impact: substitution vs. transformation

Best Practices:
1. Use publicly available datasets with clear licenses
2. Implement filters to prevent memorization of training data
3. Document transformative nature of the model
4. Consider obtaining licenses for valuable content
5. Implement opt-out mechanisms for content creators

Emerging Legal Theories:
- Text and data mining exceptions (EU)
- Implied licenses from web publication
- Transformative use arguments
- Market harm analysis for AI outputs

Risk Management:
- Regular legal review of training practices
- Indemnification provisions in customer contracts
- Insurance coverage for IP claims
- Monitoring of litigation developments`,
    tags: ['Copyright', 'AI/ML', 'Licensing', 'Compliance'],
    relatedTypes: ['Copyright Protection', 'License Agreement Review', 'Freedom to Operate Opinion'],
    owner: 'Sarah Johnson',
    effectiveDate: '2026-03-28',
    visibility: 'Internal',
    views: 198
  },
  {
    id: '5',
    topic: 'Trademark Considerations for AI-Generated Branding',
    summary: 'Guidance on trademark registration and enforcement for brand names and logos created using generative AI tools.',
    fullContent: `This decision provides guidance on trademark protection for AI-generated brand elements and associated legal considerations.

Registrability of AI-Generated Marks:
- Human creativity requirement in trademark law
- Sufficient human input in the generation process
- Documentation of creative direction and selection
- Distinctiveness analysis applies normally

AI Tool Considerations:
1. Review AI tool terms of service for ownership rights
2. Ensure you have proper license to use generated content
3. Document the creative process and human involvement
4. Conduct clearance searches on selected marks

Ownership Issues:
- Terms of service may claim rights to AI outputs
- Work-for-hire doctrines may not apply to AI
- Ensure contractual clarity on IP ownership
- Consider custom development vs. commercial tools

Search and Clearance:
- Standard trademark search procedures apply
- AI tools don't guarantee uniqueness or clearance
- Professional search services recommended
- International considerations for global brands

Enforcement Considerations:
- Standard likelihood of confusion analysis
- Proving copying may be more difficult
- Similar marks may arise independently through AI
- Document first use and adoption evidence

Best Practices:
1. Maintain records of AI tool usage and prompts
2. Document human selection and refinement process
3. Conduct thorough clearance searches
4. Register marks promptly after selection
5. Monitor for similar AI-generated marks
6. Consider traditional design alongside AI tools`,
    tags: ['Trademark', 'AI/ML', 'Licensing'],
    relatedTypes: ['Trademark Registration', 'License Agreement Review'],
    owner: 'Lisa Anderson',
    effectiveDate: '2026-03-20',
    visibility: 'Public',
    views: 267
  }
];

type SortOption = 'Recent' | 'Popular' | 'Effective Date';

export function LegalDecisionsPage({ onStartRequest, onClose }: { onStartRequest?: (relatedType?: string) => void; onClose: () => void }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedOwner, setSelectedOwner] = useState<string>('All');
  const [selectedVisibility, setSelectedVisibility] = useState<string>('All');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('Recent');
  const [selectedDecision, setSelectedDecision] = useState<LegalDecision | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTags([]);
    setSelectedType('All');
    setSelectedOwner('All');
    setSelectedVisibility('All');
    setDateFrom('');
    setDateTo('');
  };

  const removeFilter = (type: string, value: string) => {
    if (type === 'tag') {
      setSelectedTags(prev => prev.filter(t => t !== value));
    } else if (type === 'type') {
      setSelectedType('All');
    } else if (type === 'owner') {
      setSelectedOwner('All');
    } else if (type === 'visibility') {
      setSelectedVisibility('All');
    } else if (type === 'search') {
      setSearchQuery('');
    }
  };

  const filteredDecisions = useMemo(() => {
    let results = mockDecisions.filter(decision => {
      const matchesSearch = searchQuery === '' ||
        decision.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        decision.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        decision.fullContent.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTags = selectedTags.length === 0 ||
        selectedTags.some(tag => decision.tags.includes(tag));

      const matchesType = selectedType === 'All' ||
        decision.relatedTypes.includes(selectedType);

      const matchesOwner = selectedOwner === 'All' ||
        decision.owner === selectedOwner;

      const matchesVisibility = selectedVisibility === 'All' ||
        decision.visibility === selectedVisibility;

      const matchesDateFrom = !dateFrom ||
        new Date(decision.effectiveDate) >= new Date(dateFrom);

      const matchesDateTo = !dateTo ||
        new Date(decision.effectiveDate) <= new Date(dateTo);

      return matchesSearch && matchesTags && matchesType && matchesOwner &&
        matchesVisibility && matchesDateFrom && matchesDateTo;
    });

    // Sort results
    if (sortBy === 'Recent') {
      results.sort((a, b) => new Date(b.effectiveDate).getTime() - new Date(a.effectiveDate).getTime());
    } else if (sortBy === 'Popular') {
      results.sort((a, b) => b.views - a.views);
    } else if (sortBy === 'Effective Date') {
      results.sort((a, b) => new Date(b.effectiveDate).getTime() - new Date(a.effectiveDate).getTime());
    }

    return results;
  }, [searchQuery, selectedTags, selectedType, selectedOwner, selectedVisibility, dateFrom, dateTo, sortBy]);

  const hasActiveFilters = searchQuery !== '' || selectedTags.length > 0 ||
    selectedType !== 'All' || selectedOwner !== 'All' || selectedVisibility !== 'All' ||
    dateFrom !== '' || dateTo !== '';

  const allOwners = Array.from(new Set(mockDecisions.map(d => d.owner)));
  const allRelatedTypes = Array.from(new Set(mockDecisions.flatMap(d => d.relatedTypes)));

  const handleRequestClarification = (relatedType: string) => {
    setSelectedDecision(null);
    if (onStartRequest) {
      onStartRequest(relatedType);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--iplegal-gray-50)]">
      <PortalHeader />

      <div className="bg-white border-b border-[var(--iplegal-border)] shadow-[var(--iplegal-shadow-sm)]">
        <div className="max-w-[var(--iplegal-container-lg)] mx-auto px-[var(--iplegal-spacing-16)] py-[var(--iplegal-spacing-24)]">
          <div className="flex items-center justify-between mb-[var(--iplegal-spacing-16)]">
            <div>
              <h2 className="text-[var(--iplegal-gray-900)] mb-[var(--iplegal-spacing-4)]">
                Legal Decisions
              </h2>
              <p className="text-sm text-[var(--iplegal-gray-600)]">
                {filteredDecisions.length} decision{filteredDecisions.length !== 1 ? 's' : ''} found
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-[var(--iplegal-gray-600)] hover:text-[var(--iplegal-gray-900)]"
            >
              ← Back to Home
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-[var(--iplegal-spacing-12)]">
            <input
              type="text"
              placeholder="Search decisions, topics, and content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-[var(--iplegal-spacing-12)] py-[var(--iplegal-spacing-8)] border border-[var(--iplegal-border)] rounded-[var(--iplegal-radius)] focus:outline-none focus:ring-2 focus:ring-[var(--iplegal-focus-ring)] focus:border-transparent"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-[var(--iplegal-spacing-12)] py-[var(--iplegal-spacing-8)] border border-[var(--iplegal-border)] rounded-[var(--iplegal-radius)] focus:outline-none focus:ring-2 focus:ring-[var(--iplegal-focus-ring)] bg-white"
            >
              <option value="Recent">Sort by: Recent</option>
              <option value="Popular">Sort by: Popular</option>
              <option value="Effective Date">Sort by: Effective Date</option>
            </select>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden px-[var(--iplegal-spacing-16)] py-[var(--iplegal-spacing-8)] border border-[var(--iplegal-border)] rounded-[var(--iplegal-radius)] hover:bg-[var(--iplegal-gray-50)] min-h-[44px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--iplegal-primary)]"
            >
              🔍 Filters
            </button>
          </div>

          {hasActiveFilters && (
            <div className="mt-[var(--iplegal-spacing-12)] flex flex-wrap gap-[var(--iplegal-spacing-8)]">
              {searchQuery && (
                <div className="flex items-center gap-[var(--iplegal-spacing-4)] px-[var(--iplegal-spacing-12)] py-[var(--iplegal-spacing-4)] bg-[var(--iplegal-primary)] text-white rounded-full text-sm">
                  <span>Search: "{searchQuery}"</span>
                  <button onClick={() => removeFilter('search', '')} className="hover:opacity-80">✕</button>
                </div>
              )}
              {selectedTags.map(tag => (
                <div key={tag} className="flex items-center gap-[var(--iplegal-spacing-4)] px-[var(--iplegal-spacing-12)] py-[var(--iplegal-spacing-4)] bg-[var(--iplegal-info-bg)] text-[var(--iplegal-info)] rounded-full text-sm">
                  <span>{tag}</span>
                  <button onClick={() => removeFilter('tag', tag)} className="hover:opacity-80">✕</button>
                </div>
              ))}
              {selectedType !== 'All' && (
                <div className="flex items-center gap-[var(--iplegal-spacing-4)] px-[var(--iplegal-spacing-12)] py-[var(--iplegal-spacing-4)] bg-[var(--iplegal-success-bg)] text-[var(--iplegal-success)] rounded-full text-sm">
                  <span>Type: {selectedType}</span>
                  <button onClick={() => removeFilter('type', '')} className="hover:opacity-80">✕</button>
                </div>
              )}
              {selectedOwner !== 'All' && (
                <div className="flex items-center gap-[var(--iplegal-spacing-4)] px-[var(--iplegal-spacing-12)] py-[var(--iplegal-spacing-4)] bg-[var(--iplegal-warning-bg)] text-[var(--iplegal-warning)] rounded-full text-sm">
                  <span>Owner: {selectedOwner}</span>
                  <button onClick={() => removeFilter('owner', '')} className="hover:opacity-80">✕</button>
                </div>
              )}
              {selectedVisibility !== 'All' && (
                <div className="flex items-center gap-[var(--iplegal-spacing-4)] px-[var(--iplegal-spacing-12)] py-[var(--iplegal-spacing-4)] bg-[var(--iplegal-gray-200)] text-[var(--iplegal-gray-700)] rounded-full text-sm">
                  <span>Visibility: {selectedVisibility}</span>
                  <button onClick={() => removeFilter('visibility', '')} className="hover:opacity-80">✕</button>
                </div>
              )}
              <button
                onClick={clearFilters}
                className="px-[var(--iplegal-spacing-12)] py-[var(--iplegal-spacing-4)] text-[var(--iplegal-primary)] hover:underline text-sm"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-[var(--iplegal-container-lg)] mx-auto px-[var(--iplegal-spacing-16)] py-[var(--iplegal-spacing-24)]">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-[var(--iplegal-spacing-24)]">
          <div className={`${showFilters ? 'block' : 'hidden'} md:block`}>
            <div className="bg-white border border-[var(--iplegal-border)] rounded-[var(--iplegal-radius-lg)] p-[var(--iplegal-spacing-24)] sticky top-[var(--iplegal-spacing-24)]">
              <div className="flex items-center justify-between mb-[var(--iplegal-spacing-16)]">
                <h3 className="text-[var(--iplegal-gray-900)]">Filters</h3>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-[var(--iplegal-primary)] hover:underline"
                  >
                    Clear all
                  </button>
                )}
              </div>

              <div className="space-y-[var(--iplegal-spacing-24)]">
                <div>
                  <h4 className="text-sm text-[var(--iplegal-gray-700)] mb-[var(--iplegal-spacing-8)]">
                    Tags
                  </h4>
                  <div className="space-y-[var(--iplegal-spacing-8)]">
                    {allTags.map(tag => (
                      <label key={tag} className="flex items-center gap-[var(--iplegal-spacing-8)] cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedTags.includes(tag)}
                          onChange={() => toggleTag(tag)}
                          className="w-4 h-4 border border-[var(--iplegal-border)] rounded focus:ring-2 focus:ring-[var(--iplegal-focus-ring)] accent-[var(--iplegal-primary)]"
                        />
                        <span className="text-sm text-[var(--iplegal-gray-700)]">{tag}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="border-t border-[var(--iplegal-border)] pt-[var(--iplegal-spacing-16)]">
                  <h4 className="text-sm text-[var(--iplegal-gray-700)] mb-[var(--iplegal-spacing-8)]">
                    Related Type
                  </h4>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full px-[var(--iplegal-spacing-12)] py-[var(--iplegal-spacing-8)] border border-[var(--iplegal-border)] rounded-[var(--iplegal-radius)] focus:outline-none focus:ring-2 focus:ring-[var(--iplegal-focus-ring)] bg-white text-sm"
                  >
                    <option value="All">All Types</option>
                    {allRelatedTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className="border-t border-[var(--iplegal-border)] pt-[var(--iplegal-spacing-16)]">
                  <h4 className="text-sm text-[var(--iplegal-gray-700)] mb-[var(--iplegal-spacing-8)]">
                    Owner
                  </h4>
                  <select
                    value={selectedOwner}
                    onChange={(e) => setSelectedOwner(e.target.value)}
                    className="w-full px-[var(--iplegal-spacing-12)] py-[var(--iplegal-spacing-8)] border border-[var(--iplegal-border)] rounded-[var(--iplegal-radius)] focus:outline-none focus:ring-2 focus:ring-[var(--iplegal-focus-ring)] bg-white text-sm"
                  >
                    <option value="All">All Owners</option>
                    {allOwners.map(owner => (
                      <option key={owner} value={owner}>{owner}</option>
                    ))}
                  </select>
                </div>

                <div className="border-t border-[var(--iplegal-border)] pt-[var(--iplegal-spacing-16)]">
                  <h4 className="text-sm text-[var(--iplegal-gray-700)] mb-[var(--iplegal-spacing-8)]">
                    Visibility
                  </h4>
                  <select
                    value={selectedVisibility}
                    onChange={(e) => setSelectedVisibility(e.target.value)}
                    className="w-full px-[var(--iplegal-spacing-12)] py-[var(--iplegal-spacing-8)] border border-[var(--iplegal-border)] rounded-[var(--iplegal-radius)] focus:outline-none focus:ring-2 focus:ring-[var(--iplegal-focus-ring)] bg-white text-sm"
                  >
                    <option value="All">All Visibility</option>
                    <option value="Public">Public</option>
                    <option value="Internal">Internal</option>
                    <option value="Confidential">Confidential</option>
                  </select>
                </div>

                <div className="border-t border-[var(--iplegal-border)] pt-[var(--iplegal-spacing-16)]">
                  <h4 className="text-sm text-[var(--iplegal-gray-700)] mb-[var(--iplegal-spacing-8)]">
                    Effective Date Range
                  </h4>
                  <div className="space-y-[var(--iplegal-spacing-8)]">
                    <input
                      type="date"
                      value={dateFrom}
                      onChange={(e) => setDateFrom(e.target.value)}
                      placeholder="From"
                      className="w-full px-[var(--iplegal-spacing-12)] py-[var(--iplegal-spacing-8)] border border-[var(--iplegal-border)] rounded-[var(--iplegal-radius)] focus:outline-none focus:ring-2 focus:ring-[var(--iplegal-focus-ring)] text-sm"
                    />
                    <input
                      type="date"
                      value={dateTo}
                      onChange={(e) => setDateTo(e.target.value)}
                      placeholder="To"
                      className="w-full px-[var(--iplegal-spacing-12)] py-[var(--iplegal-spacing-8)] border border-[var(--iplegal-border)] rounded-[var(--iplegal-radius)] focus:outline-none focus:ring-2 focus:ring-[var(--iplegal-focus-ring)] text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            {filteredDecisions.length === 0 ? (
              <div className="bg-white border border-[var(--iplegal-border)] rounded-[var(--iplegal-radius-lg)] p-[var(--iplegal-spacing-48)] text-center">
                <div className="text-5xl mb-[var(--iplegal-spacing-16)]">📚</div>
                <h3 className="text-[var(--iplegal-gray-900)] mb-[var(--iplegal-spacing-8)]">
                  No decisions found
                </h3>
                <p className="text-[var(--iplegal-gray-600)] mb-[var(--iplegal-spacing-24)] max-w-sm mx-auto">
                  {hasActiveFilters
                    ? "No decisions match your current filters. Try adjusting your search criteria."
                    : "No legal decisions are available at this time."}
                </p>
                {hasActiveFilters && (
                  <SecondaryButton onClick={clearFilters}>
                    Clear Filters
                  </SecondaryButton>
                )}
              </div>
            ) : (
              <div className="space-y-[var(--iplegal-spacing-16)]">
                {filteredDecisions.map(decision => (
                  <button
                    key={decision.id}
                    onClick={() => setSelectedDecision(decision)}
                    className="w-full text-left bg-white border border-[var(--iplegal-border)] rounded-[var(--iplegal-radius-lg)] p-[var(--iplegal-spacing-24)] hover:border-[var(--iplegal-primary)] hover:shadow-[var(--iplegal-shadow-md)] transition-all"
                  >
                    <div className="flex items-start justify-between gap-[var(--iplegal-spacing-12)] mb-[var(--iplegal-spacing-12)]">
                      <h3 className="text-[var(--iplegal-gray-900)] flex-1">
                        {decision.topic}
                      </h3>
                      <div className="flex items-center gap-[var(--iplegal-spacing-8)]">
                        <span className="text-xs text-[var(--iplegal-gray-500)]">
                          {decision.views} views
                        </span>
                        <span className={`px-[var(--iplegal-spacing-8)] py-[var(--iplegal-spacing-4)] rounded text-xs ${
                          decision.visibility === 'Public' ? 'bg-[var(--iplegal-success-bg)] text-[var(--iplegal-success)]' :
                          decision.visibility === 'Internal' ? 'bg-[var(--iplegal-info-bg)] text-[var(--iplegal-info)]' :
                          'bg-[var(--iplegal-warning-bg)] text-[var(--iplegal-warning)]'
                        }`}>
                          {decision.visibility}
                        </span>
                      </div>
                    </div>
                    <p className="text-[var(--iplegal-gray-700)] mb-[var(--iplegal-spacing-16)]">
                      {decision.summary}
                    </p>
                    <div className="flex flex-wrap items-center gap-[var(--iplegal-spacing-12)]">
                      <div className="flex flex-wrap gap-[var(--iplegal-spacing-8)]">
                        {decision.tags.map(tag => (
                          <span
                            key={tag}
                            className="px-[var(--iplegal-spacing-8)] py-[var(--iplegal-spacing-4)] bg-[var(--iplegal-gray-100)] text-[var(--iplegal-gray-700)] rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-[var(--iplegal-spacing-12)] text-xs text-[var(--iplegal-gray-600)] ml-auto">
                        <span>By {decision.owner}</span>
                        <span>•</span>
                        <span>
                          {new Date(decision.effectiveDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedDecision && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-[var(--iplegal-spacing-16)] overflow-y-auto" onClick={() => setSelectedDecision(null)}>
          <div className="bg-white rounded-[var(--iplegal-radius-lg)] shadow-[var(--iplegal-shadow-lg)] max-w-4xl w-full my-[var(--iplegal-spacing-24)]" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between px-[var(--iplegal-spacing-24)] py-[var(--iplegal-spacing-16)] border-b border-[var(--iplegal-border)]">
              <div className="flex-1 pr-[var(--iplegal-spacing-16)]">
                <h2 className="text-[var(--iplegal-gray-900)] mb-[var(--iplegal-spacing-8)]">
                  {selectedDecision.topic}
                </h2>
                <div className="flex flex-wrap gap-[var(--iplegal-spacing-8)]">
                  {selectedDecision.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-[var(--iplegal-spacing-8)] py-[var(--iplegal-spacing-4)] bg-[var(--iplegal-gray-100)] text-[var(--iplegal-gray-700)] rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <button onClick={() => setSelectedDecision(null)} className="text-[var(--iplegal-gray-600)] hover:text-[var(--iplegal-gray-900)] text-2xl">
                ✕
              </button>
            </div>

            <div className="px-[var(--iplegal-spacing-24)] py-[var(--iplegal-spacing-24)] max-h-[60vh] overflow-y-auto">
              <div className="prose prose-sm max-w-none mb-[var(--iplegal-spacing-24)]">
                <div className="text-[var(--iplegal-gray-700)] whitespace-pre-line">
                  {selectedDecision.fullContent}
                </div>
              </div>

              <div className="border-t border-[var(--iplegal-border)] pt-[var(--iplegal-spacing-24)]">
                <h4 className="text-[var(--iplegal-gray-900)] mb-[var(--iplegal-spacing-12)]">
                  Related Request Types
                </h4>
                <div className="flex flex-wrap gap-[var(--iplegal-spacing-8)] mb-[var(--iplegal-spacing-16)]">
                  {selectedDecision.relatedTypes.map(type => (
                    <span
                      key={type}
                      className="px-[var(--iplegal-spacing-12)] py-[var(--iplegal-spacing-8)] bg-[var(--iplegal-info-bg)] text-[var(--iplegal-info)] rounded-[var(--iplegal-radius)] text-sm border border-[var(--iplegal-info-border)]"
                    >
                      {type}
                    </span>
                  ))}
                </div>

                <div className="p-[var(--iplegal-spacing-16)] bg-[var(--iplegal-gray-50)] border border-[var(--iplegal-border)] rounded-[var(--iplegal-radius)]">
                  <p className="text-sm text-[var(--iplegal-gray-700)] mb-[var(--iplegal-spacing-12)]">
                    Need clarification on this decision or have a related question?
                  </p>
                  <PrimaryButton onClick={() => handleRequestClarification(selectedDecision.relatedTypes[0])}>
                    💬 Request Clarification
                  </PrimaryButton>
                </div>
              </div>

              <div className="border-t border-[var(--iplegal-border)] mt-[var(--iplegal-spacing-24)] pt-[var(--iplegal-spacing-16)] flex items-center justify-between text-sm text-[var(--iplegal-gray-600)]">
                <div>
                  <span>Owner: {selectedDecision.owner}</span>
                  <span className="mx-[var(--iplegal-spacing-8)]">•</span>
                  <span>Effective: {new Date(selectedDecision.effectiveDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div>
                  {selectedDecision.views} views
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
