---
comments: true
date: 2009-06-07 14:41:29
layout: page
slug: dynablue-theme-page-comments-fix
title: DynaBlue Theme Page Comments Fix
wordpress_id: 54
---

[DynaBlue Theme Page](http://www.webdesignlessons.com/dynablue-wordpress-theme/)

Note:  With the Disqus commenting plugin, make sure you change the text from "0 Comments" to just "0", etc. This will get it working for blog posts but not for pages and the colors are off. That is because of disqus' comment counting code.  You can edit this to fix it as follows: Go to your disqus plugin editor line 299 and remove  most of the method dsq_comments_number from

    
    // Mark entries in index to replace comments link.
    function dsq_comments_number($comment_text) {
    global $post;
    
    if ( dsq_can_replace() ) {
    ob_start();
    the_permalink();
    $the_permalink = ob_get_contents();
    ob_end_clean();
    
    return '</a><noscript><a href="http://' . strtolower(get_option('disqus_forum_url')) . '.' . DISQUS_DOMAIN . '/?url=' . $the_permalink .'">View comments</a></noscript><a class="dsq-comment-count" href="' . $the_permalink . '#disqus_thread" wpid="' . $post->ID . '">Comments</a>';
    } else {
    return $comment_text;
    }
    }


to

    
    // Mark entries in index to replace comments link.
    function dsq_comments_number($comment_text) {
    global $post;
    
    return $comment_text;
    
    }


And change the page.php of the theme as below and it will all work:

    
    <?php get_header(); ?>
    
    <div id="content" class="narrowcolumn">
    
    <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
    <div class="post-top">
    <div class="post-title">
    <h2><a href="<?php the_permalink() ?>" rel="bookmark" title="Permanent Link to <?php if ( function_exists('the_title_attribute')) the_title_attribute(); else the_title(); ?>"><?php the_title(); ?></a></h2>
    <h3>
    Posted on : <?php the_time('d-m-Y') ?> | By : <span><?php the_author() ?></span> | In : <span class="post_cats"><?php the_category(', ') ?></span>
    </h3>
    
    </div>
    
    <h4><?php comments_number('0', '1', '%'); ?></h4>
    </div>
    <div class="post-page" id="post-<?php the_ID(); ?>">
    
    <div class="entry entry_page">
    <?php the_content('<p class="serif">Read the rest of this page &raquo;</p>'); ?>
    
    <?php wp_link_pages(array('before' => '<p><strong>Pages:</strong> ', 'after' => '</p>', 'next_or_number' => 'number')); ?>
    
    <?php edit_post_link('Edit this entry.', '<br /><p>', '</p>'); ?>
    <?php comments_template(); ?>
    </div>
    </div>
    <?php endwhile; endif; ?>
    </div>
    
    <?php get_footer(); ?>
