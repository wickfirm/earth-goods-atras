import {useIntl} from 'react-intl'
import {SidebarMenuItemWithSub} from './SidebarMenuItemWithSub'
import {SidebarMenuItem} from './SidebarMenuItem'
import {Restricted} from "../../../../../app/modules/auth/AuthAccessControl.tsx";
import React from "react";

const SidebarMenuMain = () => {
    const intl = useIntl()

    return (
        <>
            <SidebarMenuItem
                to='/dashboard'
                icon='element-11'
                title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
                fontIcon='bi-app-indicator'
            />

            <Restricted to={'view-reports'}>
                <div className='menu-item'>
                    <div className='menu-content pt-8 pb-2'>
                        <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Reports & Analytics</span>
                    </div>
                </div>

                <SidebarMenuItem to='/reports/sales' title='Sales Report' hasBullet={false} icon={'graph-up'}/>
            </Restricted>

            <Restricted to={'view-commerce'}>
                <div className='menu-item'>
                    <div className='menu-content pt-8 pb-2'>
                        <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Commerce</span>
                    </div>
                </div>
                <SidebarMenuItemWithSub
                    to='/commerce/products'
                    title='Catalog'
                    fontIcon='bi-chat-left'
                    icon='lots-shopping'
                >
                    <SidebarMenuItem to='/commerce/discount/bulk' title='Apply Bulk Discount' hasBullet={true}/>
                    <SidebarMenuItem to='/commerce/products' title='Products' hasBullet={true}/>
                    <SidebarMenuItem to='/commerce/categories' title='Categories' hasBullet={true}/>
                    <SidebarMenuItem to='/commerce/claims' title='Claims' hasBullet={true}/>
                    <SidebarMenuItem to='/commerce/highlights' title='Highlights' hasBullet={true}/>
                    <SidebarMenuItem to='/commerce/lifestyles' title='Lifestyles' hasBullet={true}/>
                    <SidebarMenuItem to='/commerce/ingredients' title='Ingredients' hasBullet={true}/>
                    <SidebarMenuItem to='/commerce/nutritional-attributes' title='Nutritional Attributes'
                                     hasBullet={true}/>
                </SidebarMenuItemWithSub>

                <SidebarMenuItemWithSub
                    to='/commerce/orders'
                    title='Orders'
                    fontIcon='bi-chat-left'
                    icon='basket-ok'
                >
                    <SidebarMenuItem to='/commerce/orders' title='All Orders' hasBullet={true}/>
                </SidebarMenuItemWithSub>

                <SidebarMenuItemWithSub
                    to='/commerce/customers'
                    title='Customers'
                    fontIcon='bi-chat-left'
                    icon='people'
                >
                    <SidebarMenuItem to='/commerce/customers' title='All Customers' hasBullet={true}/>
                </SidebarMenuItemWithSub>

                <SidebarMenuItemWithSub
                    to='/commerce/discount-codes'
                    title='Discount Codes'
                    fontIcon='bi-chat-left'
                    icon='discount'
                >
                    <SidebarMenuItem to='/commerce/discount-codes' title='All Discount Codes' hasBullet={true}/>
                </SidebarMenuItemWithSub>
            </Restricted>

            {/*/!*<Restricted to={'view-inventory'}>*!/*/}
            {/*<div className='menu-item'>*/}
            {/*    <div className='menu-content pt-8 pb-2'>*/}
            {/*        <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Inventory</span>*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/*<SidebarMenuItem to='/inventory/stock' title='Track Stock Levels' hasBullet={false}*/}
            {/*                 icon={'parcel-tracking'}/>*/}
            {/*<SidebarMenuItem to='/inventory/reorder-points' title='Reorder Points' hasBullet={false}*/}
            {/*                 icon={'arrow-circle-left'}/>*/}
            {/*<SidebarMenuItem to='/inventory/suppliers' title='Manage Suppliers' hasBullet={false} icon={'truck'}/>*/}
            {/*</Restricted>*/}

            <Restricted to={'view-engagement'}>
                <div className='menu-item'>
                    <div className='menu-content pt-8 pb-2'>
                        <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Engagement</span>
                    </div>
                </div>

                <SidebarMenuItemWithSub
                    to='/engagement/reviews'
                    title='Product Reviews'
                    fontIcon='bi-chat-left'
                    icon='star'
                >
                    <SidebarMenuItem to='/engagement/reviews' title='All Reviews' hasBullet={true}/>
                </SidebarMenuItemWithSub>

                <SidebarMenuItemWithSub
                    to='/engagement/subscriptions'
                    title='Newsletter Subscriptions'
                    fontIcon='bi-chat-left'
                    icon='like'
                >
                    <SidebarMenuItem to='/engagement/subscriptions' title='All Subscriptions' hasBullet={true}/>
                </SidebarMenuItemWithSub>

                {/*<SidebarMenuItemWithSub*/}
                {/*    to='/engagement/get-code-users'*/}
                {/*    title='Get Code Submissions'*/}
                {/*    fontIcon='bi-chat-left'*/}
                {/*    icon='tag'*/}
                {/*>*/}
                {/*    <SidebarMenuItem to='/engagement/get-code-submissions' title='All Get Code Submissions' hasBullet={true}/>*/}
                {/*</SidebarMenuItemWithSub>*/}

                <SidebarMenuItemWithSub
                    to='/engagement/contact-submissions'
                    title='Contact Us Submissions'
                    fontIcon='bi-chat-left'
                    icon='notification-status'
                >
                    <SidebarMenuItem to='/engagement/contact-submissions' title='All Contact Submissions'
                                     hasBullet={true}/>
                </SidebarMenuItemWithSub>
            </Restricted>

            <Restricted to={'view-content'}>
                <div className='menu-item'>
                    <div className='menu-content pt-8 pb-2'>
                        <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Content</span>
                    </div>
                </div>
                <SidebarMenuItemWithSub
                    to='/content/recipes'
                    title='Recipes'
                    fontIcon='bi-chat-left'
                    icon='milk'
                >
                    <SidebarMenuItem to='/content/recipes' title='All Recipes' hasBullet={true}/>
                </SidebarMenuItemWithSub>
                <SidebarMenuItemWithSub
                    to='/content/blogs'
                    title='Blogs'
                    fontIcon='bi-chat-left'
                    icon='note-2'
                >
                    <SidebarMenuItem to='/content/blogs' title='All Blogs' hasBullet={true}/>
                </SidebarMenuItemWithSub>
                <SidebarMenuItemWithSub
                    to='/content/faq'
                    title='FAQ'
                    fontIcon='bi-chat-left'
                    icon='question'
                >
                    <SidebarMenuItem to='/content/faqs' title='All FAQs' hasBullet={true}/>
                    <SidebarMenuItem to='/content/faqs/reorder' title='Reorder FAQs' hasBullet={true}/>
                </SidebarMenuItemWithSub>
                <SidebarMenuItemWithSub
                    to='/content/customer-reviews'
                    title='Customer Reviews'
                    fontIcon='bi-chat-left'
                    icon='emoji-happy'
                >
                    <SidebarMenuItem to='/content/customer-reviews' title='All Customer Reviews' hasBullet={true}/>
                </SidebarMenuItemWithSub>
                <SidebarMenuItemWithSub
                    to='/content/site'
                    title='Site Content'
                    fontIcon='bi-chat-left'
                    icon='subtitle'
                >
                    <SidebarMenuItem to='/content/site/pages/1/edit' title='Home Page' hasBullet={true}/>
                    <SidebarMenuItem to='/content/site/pages/2/edit' title='Our Story Page' hasBullet={true}/>
                </SidebarMenuItemWithSub>
                <SidebarMenuItemWithSub
                    to='/content/banners'
                    title='Promotional Banners'
                    fontIcon='bi-chat-left'
                    icon='abstract-26'
                >
                    <SidebarMenuItem to='/content/banners' title='All banners' hasBullet={true}/>
                </SidebarMenuItemWithSub>
                <SidebarMenuItemWithSub
                    to='/content/newsletters'
                    title='Newsletter'
                    fontIcon='bi-chat-left'
                    icon='picture'
                >
                    <SidebarMenuItem to='/content/newsletters' title='Newsletter Popup' hasBullet={true}/>
                </SidebarMenuItemWithSub>
                <SidebarMenuItemWithSub
                    to='/content/policies'
                    title='Policies'
                    fontIcon='bi-chat-left'
                    icon='shield'
                >
                    <SidebarMenuItem to='/content/policies/privacy-policy' title='Privacy Policy' hasBullet={true}/>
                    <SidebarMenuItem to='/content/policies/terms-and-conditions' title='Terms & Conditions'
                                     hasBullet={true}/>
                </SidebarMenuItemWithSub>
            </Restricted>

            <Restricted to={'view-misc'}>
                <div className='menu-item'>
                    <div className='menu-content pt-8 pb-2'>
                        <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Settings</span>
                    </div>
                </div>
            </Restricted>

            <Restricted to={'view-iam'}>
                <SidebarMenuItemWithSub
                    to='/iam/permissions'
                    title='IAM'
                    fontIcon='bi-chat-left'
                    icon='security-user'
                >
                    <SidebarMenuItem to='/iam/permissions' title='Permissions' hasBullet={true}/>
                    <SidebarMenuItem to='/iam/roles' title='Roles' hasBullet={true}/>
                    <SidebarMenuItem to='/iam/users' title='Users' hasBullet={true}/>
                </SidebarMenuItemWithSub>
            </Restricted>

            <Restricted to={'view-misc'}>
                <div className="pb-2"></div>
                <SidebarMenuItemWithSub
                    to='/misc/categories'
                    title='MISC'
                    fontIcon='bi-chat-left'
                    icon='gear'
                >
                    <SidebarMenuItem to='/misc/countries' title='Countries' hasBullet={true}/>
                    <SidebarMenuItem to='/misc/cities' title='Cities' hasBullet={true}/>
                    <SidebarMenuItem to='/misc/collections' title='Collections' hasBullet={true}/>
                    {/*<SidebarMenuItem to='/misc/payment-methods' title='Payment Methods' hasBullet={true}/>*/}
                </SidebarMenuItemWithSub>
            </Restricted>
        </>
    )
}

export {SidebarMenuMain}
