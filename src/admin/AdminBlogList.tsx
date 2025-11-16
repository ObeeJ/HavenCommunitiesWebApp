import { useState, useEffect } from 'react';
import svgPaths from "../imports/svg-pn5n5h9mf6";
import { Edit, Trash2 } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt: string;
  imageUrl: string;
}

interface AdminBlogListProps {
  onCreateNew?: () => void;
  onEditPost?: (id: string) => void;
  onDeletePost?: (id: string) => void;
  onLogout?: () => void;
}

export default function AdminBlogList({ onCreateNew, onEditPost, onDeletePost, onLogout }: AdminBlogListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);

  // Fetch blog posts from backend API
  useEffect(() => {
    const fetchBlogPosts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(
          `/make-server-59b4d089/admin/blog?page=${currentPage}&limit=10`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch blog posts: ${response.statusText}`);
        }

        const data = await response.json();
        if (data.success) {
          setBlogPosts(data.data);
          setTotalPages(data.pagination?.totalPages || 1);
        } else {
          setError(data.message || 'Failed to load blog posts');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching blog posts');
        console.error('Error fetching blog posts:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogPosts();
  }, [currentPage]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    if (onLogout) {
      onLogout();
    }
  };

  const handleCreateNew = () => {
    if (onCreateNew) {
      onCreateNew();
    }
  };

  const handleEditPost = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (onEditPost) {
      onEditPost(id);
    }
  };

  const handleDeletePost = (id: string, title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      if (onDeletePost) {
        onDeletePost(id);
      }
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full">
      {/* Content Section */}
      <div className="content-stretch flex flex-col gap-[24px] items-start pt-[32px] relative shrink-0 w-full">
        <div className="relative shrink-0 w-full">
          <div className="size-full">
            <div className="box-border content-stretch flex flex-col gap-[24px] items-start px-[32px] py-0 relative w-full">
              <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
                <div className="[grid-area:1_/_1] box-border content-stretch flex flex-col gap-[20px] items-start ml-0 mt-0 relative w-[1376px]">
                  <p className="font-['Avenir:Heavy',sans-serif] leading-[38px] not-italic relative shrink-0 text-[#155eef] text-[30px] w-full">Publish a blog</p>
                </div>
              </div>
              <p className="font-['Avenir:Medium',sans-serif] leading-[20px] min-w-full not-italic relative shrink-0 text-[#475467] text-[16px] w-[min-content]">Publish a blog for your users</p>
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mx-8 mt-4 w-[calc(100%-64px)]">
          <p className="text-red-800 font-medium">{error}</p>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="bg-white box-border content-stretch flex flex-col gap-[64px] items-center pb-[96px] pt-0 px-0 relative shrink-0 w-full">
          <div className="max-w-[1280px] relative shrink-0 w-full">
            <div className="box-border content-stretch flex flex-col gap-[24px] items-start max-w-inherit px-[32px] py-0 relative w-full">
              <p className="text-[#475467] text-[16px]">Loading blog posts...</p>
            </div>
          </div>
        </div>
      )}

      {/* Blog Posts Grid */}
      {!isLoading && (
        <div className="bg-white box-border content-stretch flex flex-col gap-[64px] items-center pb-[96px] pt-0 px-0 relative shrink-0 w-full">
          <div className="max-w-[1280px] relative shrink-0 w-full">
            <div className="max-w-inherit size-full">
              <div className="box-border content-stretch flex flex-col gap-[64px] items-start max-w-inherit px-[32px] py-0 relative w-full">
                {blogPosts.length === 0 ? (
                  <div className="w-full text-center py-12">
                    <p className="text-[#475467] text-[16px]">No blog posts yet. Create one to get started!</p>
                  </div>
                ) : (
                  <>
                    <div className="content-start flex flex-wrap gap-[32px] items-start relative shrink-0 w-full">
                      {blogPosts.map((post) => (
                        <div
                          key={post.id}
                          className="basis-0 content-stretch flex flex-col gap-[16px] grow items-start min-h-px min-w-[400px] relative shrink-0 group"
                        >
                          <div className="aspect-[384/256] overflow-clip relative rounded-[16px] shrink-0 w-full">
                            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[16px] size-full" src={post.imageUrl} />
                            <div className="absolute bg-gradient-to-b bottom-0 content-stretch flex flex-col from-[rgba(0,0,0,0)] items-center justify-center left-0 right-0 to-[rgba(0,0,0,0.4)]">
                              <div className="backdrop-blur-md backdrop-filter bg-[rgba(255,255,255,0.3)] relative shrink-0 w-full">
                                <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-[rgba(255,255,255,0.3)] border-solid inset-0 pointer-events-none" />
                                <div className="size-full">
                                  <div className="box-border content-stretch flex flex-col gap-[24px] items-start p-[20px] relative w-full">
                                    <div className="content-stretch flex items-start justify-between leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap text-white w-full whitespace-pre">
                                      <div className="content-stretch flex flex-col items-start relative shrink-0">
                                        <p className="font-['Avenir:Medium',sans-serif] relative shrink-0">{post.author}</p>
                                        <p className="font-['Avenir:Regular',sans-serif] relative shrink-0">{post.publishedAt}</p>
                                      </div>
                                      <p className="font-['Avenir:Heavy',sans-serif] relative shrink-0">{post.category}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* Edit/Delete Action Buttons */}
                            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={(e) => handleEditPost(post.id, e)}
                                className="bg-white/90 hover:bg-white p-2 rounded-lg shadow-lg transition-all"
                                title="Edit blog post"
                              >
                                <Edit size={18} className="text-[#155eef]" />
                              </button>
                              <button
                                onClick={(e) => handleDeletePost(post.id, post.title, e)}
                                className="bg-white/90 hover:bg-white p-2 rounded-lg shadow-lg transition-all"
                                title="Delete blog post"
                              >
                                <Trash2 size={18} className="text-red-600" />
                              </button>
                            </div>
                          </div>
                          <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full">
                            <div className="content-stretch flex flex-col gap-[4px] items-start not-italic relative shrink-0 w-full">
                              <p className="font-['Avenir:Heavy',sans-serif] leading-[28px] relative shrink-0 text-[#181d27] text-[18px] w-full">{post.title}</p>
                              <p className="-webkit-box font-['Avenir:Regular',sans-serif] leading-[24px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#535862] text-[16px] w-full">{post.excerpt}</p>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Add New Blog Card */}
                      <div className="bg-white box-border content-stretch flex flex-col gap-[20px] h-[472px] items-start justify-center p-[16px] relative rounded-[12px] shrink-0 w-[592px]">
                        <div aria-hidden="true" className="absolute border border-[#eaecf0] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_3px_0px_rgba(16,24,40,0.1),0px_1px_2px_0px_rgba(16,24,40,0.06)]" />
                        <button
                          onClick={handleCreateNew}
                          className="bg-[#155eef] h-[64px] relative rounded-[8px] shrink-0 w-full"
                        >
                          <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
                            <div className="box-border content-stretch flex gap-[8px] h-[64px] items-center justify-center px-[18px] py-[10px] relative w-full">
                              <p className="font-['Avenir:Heavy',sans-serif] leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">Add New Blog</p>
                              <div className="overflow-clip relative shrink-0 size-[20px]">
                                <div className="absolute inset-[20.833%]">
                                  <div className="absolute inset-[-7.143%]" style={{ "--stroke-0": "rgba(255, 255, 255, 1)" } as React.CSSProperties}>
                                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                                      <path d={svgPaths.p1b67fa00} stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div aria-hidden="true" className="absolute border border-[#155eef] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
                        </button>
                      </div>
                    </div>

                    {/* Pagination */}
                    {blogPosts.length > 0 && (
                      <div className="box-border content-stretch flex gap-[12px] items-center justify-center pb-0 pt-[20px] px-0 relative shrink-0 w-full">
                        <div aria-hidden="true" className="absolute border-[#eaecf0] border-[1px_0px_0px] border-solid bottom-0 left-0 pointer-events-none right-0 top-[-1px]" />
                        <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative shrink-0">
                          <button
                            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className="content-stretch flex gap-[6px] items-center justify-center overflow-clip relative shrink-0 disabled:opacity-50"
                          >
                            <div className="overflow-clip relative shrink-0 size-[20px]">
                              <div className="absolute inset-[20.833%]">
                                <div className="absolute inset-[-7.143%]" style={{ "--stroke-0": "rgba(71, 84, 103, 1)" } as React.CSSProperties}>
                                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                                    <path d={svgPaths.p3ba8b580} stroke="var(--stroke-0, #475467)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#475467] text-[14px] text-nowrap whitespace-pre">Previous</p>
                          </button>
                        </div>

                        <div className="content-stretch flex gap-[2px] items-start relative shrink-0">
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                              key={page}
                              onClick={() => handlePageChange(page)}
                              className={`overflow-clip relative rounded-[20px] shrink-0 size-[40px] ${currentPage === page ? 'bg-gray-50' : ''}`}
                            >
                              <div className="absolute box-border content-stretch flex items-center justify-center left-0 p-[8px] rounded-[20px] size-[40px] top-0">
                                <p className={`font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-nowrap whitespace-pre ${currentPage === page ? 'text-[#182230]' : 'text-[#475467]'}`}>{page}</p>
                              </div>
                            </button>
                          ))}
                        </div>

                        <div className="basis-0 content-stretch flex grow items-center justify-end min-h-px min-w-px relative shrink-0">
                          <button
                            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                            className="content-stretch flex gap-[6px] items-center justify-center overflow-clip relative shrink-0 disabled:opacity-50"
                          >
                            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#475467] text-[14px] text-nowrap whitespace-pre">Next</p>
                            <div className="overflow-clip relative shrink-0 size-[20px]">
                              <div className="absolute inset-[20.833%]">
                                <div className="absolute inset-[-7.143%]" style={{ "--stroke-0": "rgba(71, 84, 103, 1)" } as React.CSSProperties}>
                                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                                    <path d={svgPaths.p19aed710} stroke="var(--stroke-0, #475467)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
