import React, { useState } from 'react'
import { FaPaperPlane } from 'react-icons/fa6'
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog'
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export const RequestIcon = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
    const closeModal = () => setIsModalOpen(false);
  const handleRequestClick = () => {
      setIsModalOpen(true);
    };
  
    return (
      <div>
        <button className="inline-flex items-center px-4 lg:px-5 py-2 font-medium rounded-lg whitespace-nowrap    transition-all duration-200 bg-purple-600 hover:bg-purple-700 text-white" onClick={handleRequestClick}><FaPaperPlane className="mr-2"/>
          Request Icon
        </button>
  
        {isModalOpen && (
  
        <Dialog open={true} onOpenChange={closeModal}>
        <DialogContent className="sm:max-w-2xl w-full rounded-2xl bg-white shadow-[0_0_50px_-12px] shadow-purple-500/10 border border-slate-200 max-h-[90vh] overflow-y-auto">
        <div>
        <h3 className="text-base font-semibold text-slate-900">
        Did not find your icon? Don't worry, you can raise a request to add one!
                </h3>
          
        <div className='mt-4'>
            <Input placeholder="Enter icon's website"/>
          </div>
        </div>
        
        <button className=" justify-center items-center px-4 lg:px-5 py-2 font-medium rounded-lg whitespace-nowrap bg-purple-600 hover:bg-purple-700 text-white">Submit</button>
          
        </DialogContent>
      </Dialog>
      )}
      </div>
    )
  }